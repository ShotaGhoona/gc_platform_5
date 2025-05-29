from pydantic import BaseModel
from typing import List, Optional

class AttendanceDaysResponse(BaseModel):
    days: List[str]

class Ranker(BaseModel):
    user_id: str
    name: str
    profile_icon_url: str
    bio: str
    score: float

class MonthlyRankingResponse(BaseModel):
    ranking: List[Ranker]

class TotalRankingResponse(BaseModel):
    ranking: List[Ranker]

class StreakingRankingResponse(BaseModel):
    ranking: List[Ranker]
