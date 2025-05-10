from sqlalchemy.orm import Session
from app.database.models.monthlyGoal import MonthlyGoal
from typing import List, Optional

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

    def get_by_user(self, user_id: str) -> List[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(MonthlyGoal.user_id == user_id, MonthlyGoal.deleted_at.is_(None)).all()

    def get_public_goals(self) -> List[MonthlyGoal]:
        return self.db.query(MonthlyGoal).filter(MonthlyGoal.is_public == True, MonthlyGoal.deleted_at.is_(None)).all()

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
