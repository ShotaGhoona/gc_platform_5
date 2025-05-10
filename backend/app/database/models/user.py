from sqlalchemy import Column, String, DateTime, func

from app.database.models.base import Base

class User(Base):
    __tablename__ = "users"

    # ClerkのユーザーIDを主キーとして使用
    clerk_id = Column(String, primary_key=True)
    
    # ユーザー情報
    email = Column(String, unique=True, nullable=False)
    username = Column(String, nullable=True)
    
    # タイムスタンプ
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<User(clerk_id={self.clerk_id}, email={self.email})>"
