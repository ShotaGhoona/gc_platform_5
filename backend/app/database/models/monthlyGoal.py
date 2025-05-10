from sqlalchemy import Column, Integer, Text, Date, Boolean, DateTime, ForeignKey, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

class MonthlyGoal(Base):
    __tablename__ = "monthly_goals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    goal_text = Column(Text)
    monthly_start_date = Column(Date)
    is_public = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)
    fb = Column(Text, nullable=True)  # フィードバック欄を追加

    # リレーション
    user = relationship("User", back_populates="monthly_goals")
