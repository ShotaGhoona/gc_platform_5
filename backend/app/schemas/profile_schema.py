from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class InterestSchema(BaseModel):
    id: int
    name: str
    color: Optional[str] = None

    class Config:
        orm_mode = True

class CoreSkillSchema(BaseModel):
    id: int
    name: str
    color: Optional[str] = None
    icon: Optional[str] = None

    class Config:
        orm_mode = True

class TierSchema(BaseModel):
    id: int
    title_en: str
    title_ja: str
    badge_color: str
    card_image_url: Optional[str] = None

    class Config:
        orm_mode = True

class MemberListSchema(BaseModel):
    user_id: str
    username: str
    avatar_image_url: Optional[str] = None
    bio: Optional[str] = None

    class Config:
        orm_mode = True

class SnsSchema(BaseModel):
    id: int
    name: str
    image_url: Optional[str] = None
    link: str

    class Config:
        orm_mode = True

class SnsUpdateSchema(BaseModel):
    id: int
    link: str

class ProfileUpdateSchema(BaseModel):
    username: str
    bio: Optional[str] = None
    one_line_profile: Optional[str] = None
    background: Optional[str] = None
    avatar_image_url: Optional[str] = None
    interests: Optional[List[int]] = None
    core_skills: Optional[List[int]] = None
    sns: Optional[List[SnsUpdateSchema]] = None

class MemberDetailSchema(BaseModel):
    user_id: str
    username: str
    bio: Optional[str] = None
    one_line_profile: Optional[str] = None
    background: Optional[str] = None
    avatar_image_url: Optional[str] = None
    created_at: Optional[str] = None
    interests: List[InterestSchema] = []
    core_skills: List[CoreSkillSchema] = []
    sns: List[SnsSchema] = []
    tiers: List[TierSchema] = []

    class Config:
        orm_mode = True
