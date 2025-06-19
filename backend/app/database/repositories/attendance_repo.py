from sqlalchemy.orm import Session
from app.database.models.attendance import Attendance, AttendanceFlag
from datetime import date

class AttendanceRepository:
    def __init__(self, db: Session):
        self.db = db

    def add_attendance(self, user_id: str, username: str, channel: str, joined_at):
        attendance = Attendance(
            user_id=user_id,
            username=username,
            channel=channel,
            joined_at=joined_at
        )
        self.db.add(attendance)
        self.db.commit()
        self.db.refresh(attendance)
        return attendance

    def get_attendance_days_by_month(self, user_id: str, year: int, month: int):
        # 指定ユーザー・月でsix_clock_flag=Trueの日付リストを返す
        from sqlalchemy import extract
        q = (
            self.db.query(AttendanceFlag)
            .filter(
                AttendanceFlag.user_id == user_id,
                AttendanceFlag.six_clock_flag == True,
                extract("year", AttendanceFlag.date) == year,
                extract("month", AttendanceFlag.date) == month,
            )
        )
        return [af.date for af in q.all()]

    def get_total_attendance_days(self, user_id: str):
        # 全期間のsix_clock_flag=Trueの日付数を返す
        q = (
            self.db.query(AttendanceFlag)
            .filter(
                AttendanceFlag.user_id == user_id,
                AttendanceFlag.six_clock_flag == True,
            )
        )
        return q.count()

    def get_monthly_ranking(self, year: int, month: int):
        """
        指定年月のユーザーごとの6時出席回数ランキングを返す
        Returns: List[dict] (user_id, count)
        """
        from sqlalchemy import extract, func
        q = (
            self.db.query(
                AttendanceFlag.user_id,
                func.count().label("count")
            )
            .filter(
                AttendanceFlag.six_clock_flag == True,
                extract("year", AttendanceFlag.date) == year,
                extract("month", AttendanceFlag.date) == month,
            )
            .group_by(AttendanceFlag.user_id)
            .order_by(func.count().desc())
        )
        return [{"user_id": row.user_id, "count": row.count} for row in q.all()]

    def get_total_ranking(self):
        """
        全期間のユーザーごとの6時出席率ランキングを返す
        Returns: List[dict] (user_id, rate)
        """
        from sqlalchemy import func, distinct
        # 各ユーザーの出席日数
        subq = (
            self.db.query(
                AttendanceFlag.user_id,
                func.count().label("present_days")
            )
            .filter(AttendanceFlag.six_clock_flag == True)
            .group_by(AttendanceFlag.user_id)
            .subquery()
        )
        # 全体の出席可能日数（全ユーザー共通と仮定）
        total_days = (
            self.db.query(func.count(distinct(AttendanceFlag.date)))
            .scalar()
        ) or 1  # 0除算防止
        # 各ユーザーの出席率
        q = (
            self.db.query(
                subq.c.user_id,
                (subq.c.present_days * 100.0 / total_days).label("rate")
            )
            .order_by((subq.c.present_days * 100.0 / total_days).desc())
        )
        return [{"user_id": row.user_id, "rate": float(f"{row.rate:.1f}")} for row in q.all()]

    def get_streaking_ranking(self):
        """
        現在のユーザーごとの連続6時出席日数ランキングを返す
        Returns: List[dict] (user_id, streak)
        """
        # 連続日数はSQLだけで効率的に出すのが難しいため、Python側で処理
        from sqlalchemy import func
        from app.database.models.user import User
        from datetime import timedelta

        # 全ユーザー取得
        users = self.db.query(User).all()
        result = []
        for user in users:
            # そのユーザーの出席日（six_clock_flag=True）を降順で取得
            flags = (
                self.db.query(AttendanceFlag)
                .filter(
                    AttendanceFlag.user_id == user.clerk_id,
                    AttendanceFlag.six_clock_flag == True,
                )
                .order_by(AttendanceFlag.date.desc())
                .all()
            )
            streak = 0
            prev_date = None
            for flag in flags:
                if prev_date is None:
                    prev_date = flag.date
                    streak = 1
                else:
                    if (prev_date - flag.date).days == 1:
                        streak += 1
                        prev_date = flag.date
                    elif (prev_date - flag.date).days == 0:
                        # 同日データはスキップ
                        continue
                    else:
                        break
            result.append({"user_id": user.clerk_id, "streak": streak})
        # 連続日数で降順ソート
        result.sort(key=lambda x: x["streak"], reverse=True)
        return result
