#!/usr/bin/env python3
"""
出席データバッチ処理用CLIコマンド

Usage:
    python -m app.cli.attendance_batch daily [--date YYYY-MM-DD]
    python -m app.cli.attendance_batch range --start YYYY-MM-DD --end YYYY-MM-DD
    python -m app.cli.attendance_batch status
"""

import argparse
import sys
from datetime import date, datetime, timedelta
from pathlib import Path

# プロジェクトルートをPythonパスに追加
project_root = Path(__file__).parent.parent.parent
sys.path.insert(0, str(project_root))

from app.services.attendance_batch_service import run_daily_batch, run_initial_batch
from app.database.models.attendance import Attendance, AttendanceFlag
from app.database.session import SessionLocal
from sqlalchemy import func
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def parse_date(date_str: str) -> date:
    """日付文字列をdateオブジェクトに変換"""
    try:
        return datetime.strptime(date_str, '%Y-%m-%d').date()
    except ValueError:
        raise argparse.ArgumentTypeError(f"Invalid date format: {date_str}. Use YYYY-MM-DD")

def cmd_daily(args):
    """日次バッチ処理"""
    target_date = args.date if args.date else None
    
    logger.info("Starting daily attendance batch processing")
    logger.info(f"Target date: {target_date or 'today'}")
    
    try:
        result = run_daily_batch(target_date)
        
        print("\n=== Daily Batch Processing Results ===")
        print(f"Target Date: {target_date or date.today()}")
        print(f"Processed Users: {result['processed_users']}")
        print(f"6 O'clock Attendees: {result['six_clock_attendees']}")
        print(f"Created Flags: {result['created_flags']}")
        print(f"Updated Flags: {result['updated_flags']}")
        
        if result['unmapped_discord_ids']:
            print(f"\nUnmapped Discord IDs ({len(result['unmapped_discord_ids'])}):")
            for discord_id in sorted(result['unmapped_discord_ids']):
                print(f"  - {discord_id}")
                
        print("\n✅ Daily batch processing completed successfully")
        
    except Exception as e:
        logger.error(f"Daily batch processing failed: {e}")
        print(f"\n❌ Error: {e}")
        sys.exit(1)

def cmd_range(args):
    """日付範囲バッチ処理"""
    start_date = args.start
    end_date = args.end
    
    if start_date > end_date:
        print("❌ Error: Start date must be before or equal to end date")
        sys.exit(1)
        
    days_count = (end_date - start_date).days + 1
    if days_count > 365:
        response = input(f"⚠️  Processing {days_count} days. This may take a long time. Continue? (y/N): ")
        if response.lower() != 'y':
            print("Cancelled")
            sys.exit(0)
    
    logger.info("Starting date range attendance batch processing")
    logger.info(f"Date range: {start_date} to {end_date} ({days_count} days)")
    
    try:
        result = run_initial_batch(start_date, end_date)
        
        print("\n=== Date Range Batch Processing Results ===")
        print(f"Date Range: {start_date} to {end_date}")
        print(f"Processed Dates: {result['processed_dates']}")
        print(f"Total Processed Users: {result['total_processed_users']}")
        print(f"Total 6 O'clock Attendees: {result['total_six_clock_attendees']}")
        print(f"Total Created Flags: {result['total_created_flags']}")
        print(f"Total Updated Flags: {result['total_updated_flags']}")
        
        if result['all_unmapped_discord_ids']:
            print(f"\nAll Unmapped Discord IDs ({len(result['all_unmapped_discord_ids'])}):")
            for discord_id in sorted(result['all_unmapped_discord_ids']):
                print(f"  - {discord_id}")
                
        print("\n✅ Date range batch processing completed successfully")
        
    except Exception as e:
        logger.error(f"Date range batch processing failed: {e}")
        print(f"\n❌ Error: {e}")
        sys.exit(1)

def cmd_status(args):
    """現在のデータベース状況を表示"""
    db = SessionLocal()
    try:
        # Attendance統計
        attendance_count = db.query(func.count(Attendance.id)).scalar()
        attendance_date_range = db.query(
            func.min(Attendance.joined_at),
            func.max(Attendance.joined_at)
        ).first()
        
        # AttendanceFlag統計
        flag_count = db.query(func.count(AttendanceFlag.id)).scalar()
        flag_date_range = db.query(
            func.min(AttendanceFlag.date),
            func.max(AttendanceFlag.date)
        ).first()
        six_clock_count = db.query(func.count(AttendanceFlag.id)).filter(
            AttendanceFlag.six_clock_flag == True
        ).scalar()
        
        # ユーザー統計
        from app.database.models.user import User
        total_users = db.query(func.count(User.clerk_id)).scalar()
        discord_linked_users = db.query(func.count(User.clerk_id)).filter(
            User.discord_id.isnot(None)
        ).scalar()
        
        print("\n=== Database Status ===")
        print(f"📊 Attendance Records: {attendance_count:,}")
        if attendance_date_range[0] and attendance_date_range[1]:
            print(f"   Date Range: {attendance_date_range[0].date()} to {attendance_date_range[1].date()}")
        
        print(f"\n🏆 Attendance Flags: {flag_count:,}")
        if flag_date_range[0] and flag_date_range[1]:
            print(f"   Date Range: {flag_date_range[0]} to {flag_date_range[1]}")
        print(f"   6 O'clock Flags: {six_clock_count:,}")
        
        print(f"\n👥 Users: {total_users:,}")
        print(f"   Discord Linked: {discord_linked_users:,}")
        print(f"   Link Ratio: {discord_linked_users/total_users*100:.1f}%" if total_users > 0 else "   Link Ratio: 0%")
        
        # 未処理日の確認
        if attendance_date_range[0] and flag_date_range[1]:
            last_attendance_date = attendance_date_range[1].date()
            last_flag_date = flag_date_range[1]
            
            if last_attendance_date > last_flag_date:
                unprocessed_days = (last_attendance_date - last_flag_date).days
                print(f"\n⚠️  Unprocessed Days: {unprocessed_days}")
                print(f"   Last Attendance: {last_attendance_date}")
                print(f"   Last Flag: {last_flag_date}")
        
    except Exception as e:
        logger.error(f"Status check failed: {e}")
        print(f"\n❌ Error: {e}")
        sys.exit(1)
    finally:
        db.close()

def main():
    parser = argparse.ArgumentParser(
        description="出席データバッチ処理CLI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # 当日のデータを処理（毎朝8時実行用）
  python -m app.cli.attendance_batch daily
  
  # 特定の日のデータを処理
  python -m app.cli.attendance_batch daily --date 2024-01-15
  
  # 日付範囲でデータを処理（初期投入用）
  python -m app.cli.attendance_batch range --start 2024-01-01 --end 2024-01-31
  
  # データベース状況確認
  python -m app.cli.attendance_batch status
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Available commands')
    
    # daily コマンド
    daily_parser = subparsers.add_parser('daily', help='Run daily batch processing')
    daily_parser.add_argument(
        '--date', 
        type=parse_date, 
        help='Target date (YYYY-MM-DD). Default: today'
    )
    daily_parser.set_defaults(func=cmd_daily)
    
    # range コマンド
    range_parser = subparsers.add_parser('range', help='Run batch processing for date range')
    range_parser.add_argument(
        '--start', 
        type=parse_date, 
        required=True,
        help='Start date (YYYY-MM-DD)'
    )
    range_parser.add_argument(
        '--end', 
        type=parse_date, 
        required=True,
        help='End date (YYYY-MM-DD)'
    )
    range_parser.set_defaults(func=cmd_range)
    
    # status コマンド
    status_parser = subparsers.add_parser('status', help='Show database status')
    status_parser.set_defaults(func=cmd_status)
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    args.func(args)

if __name__ == '__main__':
    main()