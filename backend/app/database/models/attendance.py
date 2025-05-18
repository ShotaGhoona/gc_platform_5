import uuid
from sqlalchemy import Column, String, DateTime, Boolean, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from sqlalchemy.orm import relationship

from .base import Base

class Attendance(Base):
    __tablename__ = "attendances"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    discord_id = Column(String, nullable=False)
    username = Column(String, nullable=False)
    channel = Column(String, nullable=False)
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)



class AttendanceFlag(Base):
    __tablename__ = "attendance_flags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    date = Column(Date, nullable=False)
    six_clock_flag = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = relationship("User", back_populates="attendance_flags")

from app.database.models.user import User
User.attendance_flags = relationship("AttendanceFlag", back_populates="user")
