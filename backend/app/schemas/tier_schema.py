from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class TierFlag(BaseModel):
    id: int
    badge_color: str
    flag: bool

class TierDetail(BaseModel):
    id: int
    title_en: str
    title_ja: str
    badge_color: str
    short_description: Optional[str]
    long_description: Optional[str]
    story: Optional[str]
    has_tier: bool
    role: Optional[str]
    user_tier_id: Optional[str]

class TierMainSubItem(BaseModel):
    id: int
    badge_color: str

class TierMainSub(BaseModel):
    main: Optional[TierMainSubItem]
    sub: List[TierMainSubItem]
