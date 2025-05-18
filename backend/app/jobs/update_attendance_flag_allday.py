import os
from datetime import datetime, timedelta, time, date
from app.database.session import SessionLocal
from app.database.models.user import User
from app.database.models.attendance import Attendance, AttendanceFlag

START_DATE = date(2025, 4, 1)
END_DATE = datetime.now().date()
MORNING_START = time(5, 0)
MORNING_END = time(6, 10)

def main():
    db = SessionLocal()
    try:
        users = db.query(User).all()
        discord_to_userid = {u.discord_id: u.clerk_id for u in users if u.discord_id}
        for user in users:
            for single_date in daterange(START_DATE, END_DATE):
                # その日の5:00-6:10に参加しているか
                attend = (
                    db.query(Attendance)
                    .filter(
                        Attendance.discord_id == user.discord_id,
                        Attendance.joined_at >= datetime.combine(single_date, MORNING_START),
                        Attendance.joined_at < datetime.combine(single_date, MORNING_END),
                    )
                    .first()
                )
                flag = bool(attend)
                # 既存レコードがあればupdate、なければinsert
                attendance_flag = (
                    db.query(AttendanceFlag)
                    .filter(
                        AttendanceFlag.user_id == user.clerk_id,
                        AttendanceFlag.date == single_date,
                    )
                    .first()
                )
                if attendance_flag:
                    attendance_flag.six_clock_flag = flag
                    attendance_flag.updated_at = datetime.now()
                else:
                    attendance_flag = AttendanceFlag(
                        user_id=user.clerk_id,
                        date=single_date,
                        six_clock_flag=flag,
                        created_at=datetime.now(),
                        updated_at=datetime.now(),
                    )
                    db.add(attendance_flag)
        db.commit()
        print("AttendanceFlagテーブルの更新が完了しました。")
    finally:
        db.close()

def daterange(start_date, end_date):
    for n in range((end_date - start_date).days + 1):
        yield start_date + timedelta(n)

if __name__ == "__main__":
    main()
