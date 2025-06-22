import os
from datetime import datetime
from sqlalchemy import create_engine, Column, String, DateTime, Boolean, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import uuid

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is not set")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Attendance model
class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    discord_id = Column(String, nullable=False)
    username = Column(String, nullable=False)
    channel = Column(String, nullable=False)
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

class AttendanceRepository:
    def __init__(self, db: Session):
        self.db = db

    def add_attendance(self, discord_id: str, username: str, channel: str, joined_at):
        attendance = Attendance(
            discord_id=discord_id,
            username=username,
            channel=channel,
            joined_at=joined_at
        )
        self.db.add(attendance)
        self.db.commit()
        self.db.refresh(attendance)
        return attendance

async def save_attendance_event(member):
    """
    Discordのメンバー情報をAttendanceテーブルに保存する
    """
    db = SessionLocal()
    try:
        repo = AttendanceRepository(db)
        attendance = repo.add_attendance(
            discord_id=str(member.id),
            username=member.display_name,
            channel=member.voice.channel.name if member.voice and member.voice.channel else "",
            joined_at=datetime.utcnow()
        )
        print(f"Attendance saved: {attendance.id} - {member.display_name}")
    except Exception as e:
        print(f"Error saving attendance: {e}")
        db.rollback()
    finally:
        db.close()