from sqlalchemy import Column, String, DateTime, func, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.database.models.base import Base

class User(Base):
    __tablename__ = "users"
    clerk_id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, nullable=True)
    tier_id = Column(Integer, ForeignKey("tiers.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # リレーション
    profile = relationship("Profile", uselist=False, back_populates="user")
    tier = relationship("Tier", back_populates="users")
    monthly_goals = relationship("MonthlyGoal", back_populates="user")

    def __repr__(self):
        return f"<User(clerk_id={self.clerk_id}, email={self.email})>"
