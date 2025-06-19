from sqlalchemy.orm import Session
from app.database.repositories.monthlyGoal_repo import MonthlyGoalRepository
from app.schemas.monthlyGoal_shema import MonthlyGoalCreate, MonthlyGoalUpdate, MonthlyGoalResponse
from app.database.models.monthlyGoal import MonthlyGoal
from fastapi import HTTPException
from typing import List

def create_monthly_goal(db: Session, goal_in: MonthlyGoalCreate) -> MonthlyGoalResponse:
    repo = MonthlyGoalRepository(db)
    goal = MonthlyGoal(**goal_in.dict())
    created = repo.create(goal)
    return MonthlyGoalResponse.from_orm(created)

def get_monthly_goal(db: Session, goal_id: int) -> MonthlyGoalResponse:
    repo = MonthlyGoalRepository(db)
    goal = repo.get_by_id(goal_id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    return MonthlyGoalResponse.from_orm(goal)

def get_user_monthly_goals(db: Session, user_id: str) -> List[MonthlyGoalResponse]:
    repo = MonthlyGoalRepository(db)
    goals = repo.get_by_user(user_id)
    return [MonthlyGoalResponse.from_orm(g) for g in goals]

# ユーザーの今月の目標を取得
def get_user_current_month_goals(db: Session, user_id: str) -> List[MonthlyGoalResponse]:
    repo = MonthlyGoalRepository(db)
    goals = repo.get_by_user_current_month(user_id)
    return [MonthlyGoalResponse.from_orm(g) for g in goals]

def get_public_monthly_goals(db: Session) -> List[MonthlyGoalResponse]:
    repo = MonthlyGoalRepository(db)
    goals = repo.get_public_goals()
    result = []
    for g in goals:
        username = None
        avatar_image_url = None
        if hasattr(g, "user") and g.user:
            username = getattr(g.user, "username", None)
            if hasattr(g.user, "profile") and g.user.profile:
                avatar_image_url = getattr(g.user.profile, "avatar_image_url", None)
        result.append(MonthlyGoalResponse(
            id=g.id,
            user_id=g.user_id,
            goal_text=g.goal_text,
            monthly_start_date=g.monthly_start_date,
            is_public=g.is_public,
            fb=g.fb,
            created_at=g.created_at,
            deleted_at=g.deleted_at,
            username=username,
            avatar_image_url=avatar_image_url,
        ))
    return result

# 指定範囲の目標を取得
def get_user_goals_in_range(db: Session, user_id: str, start, end) -> List[MonthlyGoalResponse]:
    repo = MonthlyGoalRepository(db)
    goals = repo.get_by_user_in_range(user_id, start, end)
    return [MonthlyGoalResponse.from_orm(g) for g in goals]

def update_monthly_goal(db: Session, goal_id: int, goal_in: MonthlyGoalUpdate) -> MonthlyGoalResponse:
    repo = MonthlyGoalRepository(db)
    updates = {k: v for k, v in goal_in.dict().items() if v is not None}
    updated = repo.update(goal_id, updates)
    if not updated:
        raise HTTPException(status_code=404, detail="Goal not found")
    return MonthlyGoalResponse.from_orm(updated)

def delete_monthly_goal(db: Session, goal_id: int) -> None:
    repo = MonthlyGoalRepository(db)
    success = repo.delete(goal_id)
    if not success:
        raise HTTPException(status_code=404, detail="Goal not found")
