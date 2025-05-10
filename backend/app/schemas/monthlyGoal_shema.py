from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime

class MonthlyGoalCreate(BaseModel):
    user_id: str
    goal_text: str
    monthly_start_date: date
    is_public: bool = True

class MonthlyGoalUpdate(BaseModel):
    goal_text: Optional[str] = None
    monthly_start_date: Optional[date] = None
    is_public: Optional[bool] = None

class MonthlyGoalResponse(BaseModel):
    id: int
    user_id: str
    goal_text: str
    monthly_start_date: date
    is_public: bool
    created_at: datetime
    deleted_at: Optional[datetime]

    class Config:
        orm_mode = True
