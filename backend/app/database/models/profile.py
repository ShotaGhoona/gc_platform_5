import uuid
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .base import Base

# 中間テーブル: profileとinterest
profile_interest_table = Table(
    "profile_interest",
    Base.metadata,
    Column("profile_id", UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("interest_id", Integer, ForeignKey("interests.id", ondelete="CASCADE"), primary_key=True),
)

# 中間テーブル: profileとcore_skill
profile_core_skill_table = Table(
    "profile_core_skill",
    Base.metadata,
    Column("profile_id", UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("core_skill_id", Integer, ForeignKey("core_skills.id", ondelete="CASCADE"), primary_key=True),
)

# 中間テーブル: profileとsns
profile_sns_table = Table(
    "profile_sns",
    Base.metadata,
    Column("id", UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
    Column("profile_id", UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), nullable=False),
    Column("sns_id", Integer, ForeignKey("sns.id", ondelete="CASCADE"), nullable=False),
    Column("link", Text, nullable=False),  # ユーザーごとのSNSアカウントURL
    Column("description", Text, nullable=True),  # SNSごとの説明文
)

# 中間テーブル: profileとrival（自分が選んだライバルの関係）
profile_rival_table = Table(
    "profile_rival",
    Base.metadata,
    Column("profile_id", UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
    Column("rival_profile_id", UUID(as_uuid=True), ForeignKey("profiles.id", ondelete="CASCADE"), primary_key=True),
)

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)
    user_id = Column(String, ForeignKey("users.clerk_id"), unique=True, nullable=False)
    username = Column(String(60), nullable=False)
    vision = Column(String(120))
    bio = Column(String(120))
    one_line_profile = Column(String(120))
    background = Column(Text)
    avatar_image_url = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    # リレーション
    user = relationship("User", back_populates="profile") 

    interests = relationship(
        "Interest",
        secondary=profile_interest_table,
        back_populates="profiles"
    )

    core_skills = relationship(
        "CoreSkill",
        secondary=profile_core_skill_table,
        back_populates="profiles"
    )

    sns = relationship(
        "SNS",
        secondary=profile_sns_table,
        back_populates="profiles"
    )

    # ライバル（自分が選んだ相手）
    rivals = relationship(
        "Profile",
        secondary=profile_rival_table,
        primaryjoin=id==profile_rival_table.c.profile_id,
        secondaryjoin=id==profile_rival_table.c.rival_profile_id,
        backref="rivaled_by"
    )

class SNS(Base):
    __tablename__ = "sns"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)

    profiles = relationship(
        "Profile",
        secondary=profile_sns_table,
        back_populates="sns"
    )

class Interest(Base):
    __tablename__ = "interests"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)
    color = Column(Text, nullable=True)

    profiles = relationship(
        "Profile",
        secondary=profile_interest_table,
        back_populates="interests"
    )

class CoreSkill(Base):
    __tablename__ = "core_skills"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(60), nullable=False)
    color = Column(Text, nullable=True)
    icon = Column(Text, nullable=True)  # 画像URLやBase64等

    profiles = relationship(
        "Profile",
        secondary=profile_core_skill_table,
        back_populates="core_skills"
    )
