from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

class Tier(Base):
    __tablename__ = "tiers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title_en = Column(String(40), nullable=False)
    title_ja = Column(String(40), nullable=False)
    badge_color = Column(String(10), nullable=False)
    card_image_url = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # リレーション
    user_tiers = relationship("UserTier", back_populates="tier", cascade="all, delete-orphan")
    users = relationship(
        "User",
        secondary="user_tiers",
        back_populates="tiers",
        overlaps="user_tiers"
    )
