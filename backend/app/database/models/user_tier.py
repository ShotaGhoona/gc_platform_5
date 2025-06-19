from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.database.models.base import Base
from app.database.models.tier import Tier
from sqlalchemy.dialects.postgresql import UUID
import uuid
class UserTier(Base):
    __tablename__ = "user_tiers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    tier_id = Column(Integer, ForeignKey("tiers.id"), nullable=False)
    granted_at = Column(DateTime(timezone=True), server_default=func.now())
    role = Column(String(10), nullable=True, index=True)  # "main", "sub1", "sub2", "sub3" など

    # リレーション（必要なら）
    user = relationship("User", back_populates="user_tiers", overlaps="tiers,users")
    tier = relationship("Tier", back_populates="user_tiers", overlaps="tiers,users")
