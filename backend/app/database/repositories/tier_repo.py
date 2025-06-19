from typing import List
from sqlalchemy.orm import Session
from app.database.models.tier import Tier
from app.database.models.user_tier import UserTier

def get_all_tiers(db: Session) -> List[Tier]:
    return db.query(Tier).all()

def get_user_tier_ids(db: Session, user_id: str) -> List[int]:
    return [ut.tier_id for ut in db.query(UserTier).filter(UserTier.user_id == user_id).all()]

def get_tier_by_id(db: Session, tier_id: int) -> Tier:
    return db.query(Tier).filter(Tier.id == tier_id).first()
