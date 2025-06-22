from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_, func
from app.database.session import SessionLocal
from app.database.models.attendance import Attendance, AttendanceFlag
from app.database.models.user import User
import pytz
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class AttendanceBatchService:
    def __init__(self, db: Session = None):
        self.db = db or SessionLocal()
        self.should_close_db = db is None
        
    def __enter__(self):
        return self
        
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.should_close_db:
            self.db.close()

    def process_daily_attendance(self, target_date: date = None) -> dict:
        """
        指定日のAttendanceデータを処理してAttendanceFlagを更新する
        
        Args:
            target_date: 処理対象日（指定なしの場合は当日）
            
        Returns:
            dict: 処理結果の統計情報
        """
        if target_date is None:
            # 当日を対象とする（毎朝8時に当日分(2時間前の様子)を処理）
            target_date = date.today()
            
        logger.info(f"Processing attendance for date: {target_date}")
        
        # 1. 指定日のAttendanceデータを取得
        attendance_records = self._get_attendance_records_for_date(target_date)
        logger.info(f"Found {len(attendance_records)} attendance records")
        
        # 2. Discord IDからUser IDにマッピング
        user_mapping = self._get_discord_to_user_mapping()
        logger.info(f"Found {len(user_mapping)} discord-user mappings")
        
        # 3. 6時出席判定とAttendanceFlag作成/更新
        results = {
            'processed_users': 0,
            'six_clock_attendees': 0,
            'created_flags': 0,
            'updated_flags': 0,
            'unmapped_discord_ids': set()
        }
        
        for attendance in attendance_records:
            user_id = user_mapping.get(attendance.discord_id)
            if not user_id:
                results['unmapped_discord_ids'].add(attendance.discord_id)
                continue
                
            # 6時出席判定
            is_six_clock = self._is_six_clock_attendance(attendance.joined_at)
            
            # AttendanceFlag作成/更新
            flag_result = self._create_or_update_attendance_flag(
                user_id, target_date, is_six_clock
            )
            
            results['processed_users'] += 1
            if is_six_clock:
                results['six_clock_attendees'] += 1
            if flag_result == 'created':
                results['created_flags'] += 1
            elif flag_result == 'updated':
                results['updated_flags'] += 1
                
        self.db.commit()
        logger.info(f"Batch processing completed: {results}")
        
        return results

    def _get_attendance_records_for_date(self, target_date: date) -> list:
        """指定日のAttendanceレコードを取得"""
        jst = pytz.timezone('Asia/Tokyo')
        
        # JST での日付範囲を計算
        start_datetime = jst.localize(datetime.combine(target_date, datetime.min.time()))
        end_datetime = start_datetime + timedelta(days=1)
        
        # UTC に変換
        start_utc = start_datetime.astimezone(pytz.UTC).replace(tzinfo=None)
        end_utc = end_datetime.astimezone(pytz.UTC).replace(tzinfo=None)
        
        return (
            self.db.query(Attendance)
            .filter(
                and_(
                    Attendance.joined_at >= start_utc,
                    Attendance.joined_at < end_utc
                )
            )
            .all()
        )

    def _get_discord_to_user_mapping(self) -> dict:
        """Discord IDからUser IDへのマッピングを取得"""
        users = (
            self.db.query(User)
            .filter(User.discord_id.isnot(None))
            .all()
        )
        
        return {user.discord_id: user.clerk_id for user in users}

    def _is_six_clock_attendance(self, joined_at_utc: datetime) -> bool:
        """
        6時出席判定
        UTC時刻をJSTに変換して5:30-6:30の範囲内かチェック
        """
        jst = pytz.timezone('Asia/Tokyo')
        joined_at_jst = pytz.UTC.localize(joined_at_utc).astimezone(jst)
        
        hour = joined_at_jst.hour
        minute = joined_at_jst.minute
        
        # 5:30-6:30の範囲内
        if hour == 5 and minute >= 30:
            return True
        elif hour == 6 and minute <= 30:
            return True
        else:
            return False

    def _create_or_update_attendance_flag(self, user_id: str, target_date: date, is_six_clock: bool) -> str:
        """
        AttendanceFlagを作成または更新
        
        Returns:
            str: 'created', 'updated', 'no_change'
        """
        existing_flag = (
            self.db.query(AttendanceFlag)
            .filter(
                and_(
                    AttendanceFlag.user_id == user_id,
                    AttendanceFlag.date == target_date
                )
            )
            .first()
        )
        
        if existing_flag:
            # 既存フラグがある場合、six_clock_flagを更新（ORロジック：一度でも6時出席したらTrue）
            if is_six_clock and not existing_flag.six_clock_flag:
                existing_flag.six_clock_flag = True
                existing_flag.updated_at = datetime.utcnow()
                return 'updated'
            return 'no_change'
        else:
            # 新規フラグ作成
            new_flag = AttendanceFlag(
                user_id=user_id,
                date=target_date,
                six_clock_flag=is_six_clock
            )
            self.db.add(new_flag)
            return 'created'

    def process_date_range(self, start_date: date, end_date: date) -> dict:
        """
        日付範囲でバッチ処理を実行（初期データ投入用）
        """
        logger.info(f"Processing date range: {start_date} to {end_date}")
        
        total_results = {
            'processed_dates': 0,
            'total_processed_users': 0,
            'total_six_clock_attendees': 0,
            'total_created_flags': 0,
            'total_updated_flags': 0,
            'all_unmapped_discord_ids': set()
        }
        
        current_date = start_date
        while current_date <= end_date:
            daily_result = self.process_daily_attendance(current_date)
            
            total_results['processed_dates'] += 1
            total_results['total_processed_users'] += daily_result['processed_users']
            total_results['total_six_clock_attendees'] += daily_result['six_clock_attendees']
            total_results['total_created_flags'] += daily_result['created_flags']
            total_results['total_updated_flags'] += daily_result['updated_flags']
            total_results['all_unmapped_discord_ids'].update(daily_result['unmapped_discord_ids'])
            
            current_date += timedelta(days=1)
            
        logger.info(f"Date range processing completed: {total_results}")
        return total_results

def run_daily_batch(target_date: date = None) -> dict:
    """
    日次バッチ処理のエントリーポイント
    """
    with AttendanceBatchService() as service:
        return service.process_daily_attendance(target_date)

def run_initial_batch(start_date: date, end_date: date) -> dict:
    """
    初期データ投入用バッチ処理のエントリーポイント
    """
    with AttendanceBatchService() as service:
        return service.process_date_range(start_date, end_date)