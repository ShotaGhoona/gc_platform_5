from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database.models.monthlyGoal import MonthlyGoal
from typing import List, Optional
from datetime import date

class MonthlyGoalRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, goal: MonthlyGoal) -> MonthlyGoal:
        self.db.add(goal)
        self.db.commit()
        self.db.refresh(goal)
        return goal

    def get_by_id(self, goal_id: int) -> Optional[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(MonthlyGoal.id == goal_id, MonthlyGoal.deleted_at.is_(None)).first()

    # ユーザーの目標を取得
    def get_by_user(self, user_id: str) -> List[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(MonthlyGoal.user_id == user_id, MonthlyGoal.deleted_at.is_(None)).all()

    # ユーザーの今月の目標を取得
    def get_by_user_current_month(self, user_id: str) -> List[MonthlyGoal]:
        today = date.today()
        first_day = today.replace(day=1)
        if today.month == 12:
            next_month = today.replace(year=today.year+1, month=1, day=1)
        else:
            next_month = today.replace(month=today.month+1, day=1)
        return self.db.query(MonthlyGoal).filter(
            MonthlyGoal.user_id == user_id,
            MonthlyGoal.monthly_start_date >= first_day,
            MonthlyGoal.monthly_start_date < next_month,
            MonthlyGoal.deleted_at.is_(None)
        ).all()

    # 公開された目標を取得
    def get_public_goals(self) -> List[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(MonthlyGoal.is_public == True, MonthlyGoal.deleted_at.is_(None)).all()

    # 指定範囲の目標を取得
    def get_by_user_in_range(self, user_id: str, start, end) -> List[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(
            MonthlyGoal.user_id == user_id,
            MonthlyGoal.monthly_start_date >= start,
            MonthlyGoal.monthly_start_date < end,
            MonthlyGoal.deleted_at.is_(None)
        ).all()

    def update(self, goal_id: int, updates: dict) -> Optional[MonthlyGoal]:
        goal = self.get_by_id(goal_id)
        if not goal:
            return None
        for key, value in updates.items():
            setattr(goal, key, value)
        self.db.commit()
        self.db.refresh(goal)
        return goal

    def delete(self, goal_id: int) -> bool:
        goal = self.get_by_id(goal_id)
        if not goal:
            return False
        goal.deleted_at = func.now()
        self.db.commit()
        return True
