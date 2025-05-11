from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TierBase(BaseModel):
    id: int
    title_en: str
    title_ja: str
    badge_color: str
    card_image_url: Optional[str]
    created_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        orm_mode = True

class TierWithFlag(TierBase):
    has_tier: bool
