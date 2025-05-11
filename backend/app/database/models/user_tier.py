from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.models.base import Base

class UserTier(Base):
    __tablename__ = "user_tiers"
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    tier_id = Column(Integer, ForeignKey("tiers.id"), nullable=False)
    granted_at = Column(DateTime(timezone=True), server_default=func.now())

    # リレーション（必要なら）
    user = relationship("User", back_populates="user_tiers", overlaps="tiers,users")
    tier = relationship("Tier", back_populates="user_tiers", overlaps="tiers,users")
