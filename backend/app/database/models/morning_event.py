import uuid
from sqlalchemy import ( Column, String, Text, DateTime, ForeignKey)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from datetime import datetime

from .base import Base

# Tagテーブル
class MorningEventTag(Base):
    __tablename__ = "morning_event_tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(40), nullable=False)
    color = Column(String(10), nullable=False)

    # イベントとのリレーション
    events = relationship(
        "MorningEvent",
        secondary="morning_event_on_tags",
        back_populates="morning_event_tags"
    )

# 朝活イベントテーブル
class MorningEvent(Base):
    __tablename__ = "morning_events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(80), nullable=False)
    description = Column(Text, nullable=True)
    host_user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    start_at = Column(DateTime(timezone=True), nullable=False)
    end_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # 主催者ユーザー
    host_user = relationship("User", back_populates="hosted_events")

    # タグとのリレーション
    morning_event_tags = relationship(
        "MorningEventTag",
        secondary="morning_event_on_tags",
        back_populates="events"
    )

    # 参加者とのリレーション
    participants = relationship(
        "User",
        secondary="event_participants",
        back_populates="joined_events"
    )

# タグ中間テーブル
class MorningEventOnTag(Base):
    __tablename__ = "morning_event_on_tags"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("morning_events.id"), nullable=False)
    tag_id = Column(UUID(as_uuid=True), ForeignKey("morning_event_tags.id"), nullable=False)

# 参加者中間テーブル
class EventParticipant(Base):
    __tablename__ = "event_participants"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("morning_events.id"), nullable=False)
    user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    joined_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
