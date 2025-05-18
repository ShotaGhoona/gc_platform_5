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
