from sqlalchemy.orm import Session
from app.database.models.tier import Tier
from app.database.models.user_tier import UserTier

class TierRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_tiers(self, user_id: str):
        return (
            self.db.query(Tier)
            .join(UserTier, UserTier.tier_id == Tier.id)
            .filter(UserTier.user_id == user_id)
            .all()
        )

    def get_user_max_tier(self, user_id: str):
        return (
            self.db.query(Tier)
            .join(UserTier, UserTier.tier_id == Tier.id)
            .filter(UserTier.user_id == user_id)
            .order_by(Tier.id.desc())
            .first()
        )

    def get_tier_list_with_flag(self, user_id: str):
        # 全Tierを取得し、ユーザーが持っているかどうかのフラグを付与
        user_tier_ids = set(
            t.tier_id for t in self.db.query(UserTier).filter(UserTier.user_id == user_id).all()
        )
        all_tiers = self.db.query(Tier).all()
        return [
            {"tier": tier, "has_tier": tier.id in user_tier_ids}
            for tier in all_tiers
        ]
