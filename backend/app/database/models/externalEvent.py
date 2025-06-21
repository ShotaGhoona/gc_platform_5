from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, func, ARRAY
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from .base import Base

class ExternalEvent(Base):
    __tablename__ = "external_events"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(80), nullable=False)
    description = Column(Text, nullable=True)
    host_user_id = Column(String, ForeignKey("users.clerk_id"), nullable=False)
    image = Column(String, nullable=True)
    tags_array = Column(ARRAY(String), nullable=True)
    start_at = Column(DateTime(timezone=True), nullable=False)
    end_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

class ExternalEventTag(Base):
    __tablename__ = "external_event_tags"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(40), nullable=False)
    color = Column(String(10), nullable=False)
