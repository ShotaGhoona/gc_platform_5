from pydantic import BaseModel
from typing import List, Optional

class DashboardCard(BaseModel):
    title: str
    value: int
    unit: str
    diff: Optional[int] = None

class DashboardSummaryResponse(BaseModel):
    cards: List[DashboardCard]

class TodayLiveProfile(BaseModel):
    user_id: str
    username: str
    avatar_image_url: Optional[str] = None

class TodayLiveProfilesResponse(BaseModel):
    profiles: List[TodayLiveProfile]
