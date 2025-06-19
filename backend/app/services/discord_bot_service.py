from datetime import datetime
from app.database.repositories.attendance_repo import AttendanceRepository
from app.database.session import SessionLocal

async def save_attendance_event(member):
    """
    Discordのメンバー情報をAttendanceテーブルに保存する
    """
    db = SessionLocal()
    try:
        repo = AttendanceRepository(db)
        attendance = repo.add_attendance(
            user_id=str(member.id),
            username=member.display_name,
            channel=member.voice.channel.name if member.voice and member.voice.channel else "",
            joined_at=datetime.utcnow()
        )
        print(f"Attendance saved: {attendance.id}")
    finally:
        db.close()
