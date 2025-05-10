from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

class SystemNotice(Base):
    __tablename__ = "system_notices"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    publish_start_at = Column(DateTime, nullable=False)
    publish_end_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime, nullable=True)

    # リレーション
    tags = relationship("SystemNoticeTag", secondary="system_notice_on_tags", back_populates="notices")

class SystemNoticeTag(Base):
    __tablename__ = "system_notice_tags"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    color = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    deleted_at = Column(DateTime, nullable=True)

    # リレーション
    notices = relationship("SystemNotice", secondary="system_notice_on_tags", back_populates="tags")

class SystemNoticeOnTag(Base):
    __tablename__ = "system_notice_on_tags"

    id = Column(Integer, primary_key=True)
    system_notice_id = Column(Integer, ForeignKey("system_notices.id"), nullable=False)
    system_notice_tag_id = Column(Integer, ForeignKey("system_notice_tags.id"), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
