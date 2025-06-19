from sqlalchemy import Column, String, DateTime, func, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.database.models.base import Base
from app.database.models.profile import Profile
from app.database.models.user_tier import UserTier
from app.database.models.morning_event import MorningEvent
from app.database.models.monthlyGoal import MonthlyGoal

class User(Base):
    __tablename__ = "users"
    clerk_id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, nullable=True)
    discord_id = Column(String, unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # リレーション
    profile = relationship("Profile", uselist=False, back_populates="user")
    user_tiers = relationship("UserTier", back_populates="user", cascade="all, delete-orphan")
    tiers = relationship( "Tier", secondary="user_tiers", back_populates="users", overlaps="user_tiers" )
    hosted_events = relationship( "MorningEvent", back_populates="host_user" )
    joined_events = relationship( "MorningEvent", secondary="event_participants", back_populates="participants")
    monthly_goals = relationship("MonthlyGoal", back_populates="user")
    # attendance_flags = relationship("AttendanceFlag", back_populates="user")

    def __repr__(self):
        return f"<User(clerk_id={self.clerk_id}, email={self.email})>"
