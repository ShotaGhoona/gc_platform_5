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
    badge_color: str

    class Config:
        orm_mode = True

class MemberListSchema(BaseModel):
    user_id: str
    username: str
    avatar_image_url: Optional[str] = None
    bio: Optional[str] = None
    personal_color: Optional[str] = None

    class Config:
        orm_mode = True

class SnsSchema(BaseModel):
    id: int
    name: str
    image_url: Optional[str] = None
    link: str

    class Config:
        orm_mode = True

class SnsForMemberSchema(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    link: str

class SnsUpdateSchema(BaseModel):
    id: int
    link: str
    description: Optional[str] = None

class ProfileUpdateSchema(BaseModel):
    username: str
    bio: Optional[str] = None
    one_line_profile: Optional[str] = None
    personal_color: Optional[str] = None
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
    sns: List[SnsForMemberSchema] = []
    tiers: List[TierSchema] = []
    isRival: bool = False

    class Config:
        orm_mode = True

class VisionSchema(BaseModel):
    vision: Optional[str] = None

from pydantic import BaseModel, Field, validator
import re

class ProfileUpdate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    bio: str = Field("", max_length=15)
    one_line_profile: str = Field("", max_length=30)
    background: str = Field("", max_length=140)
    avatar_image_url: str = Field("", max_length=512)
    interests: Optional[list[int]] = None
    core_skills: Optional[list[int]] = None
    sns: Optional[list[SnsUpdateSchema]] = None

    @validator("username")
    def username_valid(cls, v):
        if not re.fullmatch(r"[a-z0-9_.]{3,20}", v):
            raise ValueError("ユーザーネームは3〜20文字の英小文字・数字・_・.のみ利用できます")
        return v

    @validator("bio")
    def bio_valid(cls, v):
        if len(v) > 15:
            raise ValueError("公開フレーズは15文字以内で入力してください")
        return v

    @validator("one_line_profile")
    def one_line_profile_valid(cls, v):
        if len(v) > 30:
            raise ValueError("OneLinerProfileは30文字以内で入力してください")
        return v

    @validator("background")
    def background_valid(cls, v):
        if len(v) > 140:
            raise ValueError("backgroundは140文字以内で入力してください")
        return v
