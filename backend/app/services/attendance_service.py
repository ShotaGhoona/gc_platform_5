from app.database.repositories.attendance_repo import AttendanceRepository

def get_attendance_days_by_month(db, user_id: str, month: str):
    """
    指定ユーザー・指定月（YYYYMM）のsix_clock_flag=Trueの日付リストを返す
    """
    if not month or len(month) != 6:
        raise ValueError("monthはYYYYMM形式で指定してください")
    year = int(month[:4])
    mon = int(month[4:])
    repo = AttendanceRepository(db)
    days = repo.get_attendance_days_by_month(user_id, year, mon)
    # 日付をYYYY-MM-DD文字列で返す
    return {"days": [d.isoformat() for d in days]}
