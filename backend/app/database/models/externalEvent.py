from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from .base import Base

# 中間テーブル
external_event_on_tags = Table(
    "external_event_on_tags",
    Base.metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("external_event_id", Integer, ForeignKey("external_events.id"), nullable=False),
    Column("external_event_tag_id", Integer, ForeignKey("external_event_tags.id"), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now()),
)

class ExternalEvent(Base):
    __tablename__ = "external_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(80), nullable=False)
    description = Column(Text, nullable=True)
    host_user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    image = Column(String, nullable=True)
    start_at = Column(DateTime(timezone=True), nullable=False)
    end_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    tags = relationship(
        "ExternalEventTag",
        secondary=external_event_on_tags,
        back_populates="events"
    )

class ExternalEventTag(Base):
    __tablename__ = "external_event_tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(40), nullable=False)
    color = Column(String(10), nullable=False)

    events = relationship(
        "ExternalEvent",
        secondary=external_event_on_tags,
        back_populates="tags"
    )
