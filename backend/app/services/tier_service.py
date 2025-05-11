from sqlalchemy.orm import Session
from app.database.repositories.tier_repo import TierRepository
from app.schemas.tier_schema import TierBase, TierWithFlag

def get_user_tiers(db: Session, user_id: str):
    repo = TierRepository(db)
    tiers = repo.get_user_tiers(user_id)
    return [TierBase.from_orm(t) for t in tiers]

def get_user_max_tier(db: Session, user_id: str):
    repo = TierRepository(db)
    tier = repo.get_user_max_tier(user_id)
    return TierBase.from_orm(tier) if tier else None

def get_tier_list_with_flag(db: Session, user_id: str):
    repo = TierRepository(db)
    result = repo.get_tier_list_with_flag(user_id)
    return [
        TierWithFlag(
            **{**TierBase.from_orm(r["tier"]).dict(), "has_tier": r["has_tier"]}
        )
        for r in result
    ]
