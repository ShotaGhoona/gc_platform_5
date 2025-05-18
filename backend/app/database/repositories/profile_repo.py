from sqlalchemy.orm import Session, joinedload
from app.database.models.profile import Profile
from app.database.models.user import User
from app.database.models.tier import Tier
from app.database.models.user_tier import UserTier

class ProfileRepository:
    @staticmethod
    def get_member_list(db: Session):
        # username, avatar_image_url, bio（Profileテーブルのみ参照）
        return (
            db.query(
                Profile.user_id,
                Profile.username,
                Profile.avatar_image_url,
                Profile.bio,
            )
            .all()
        )

    @staticmethod
    def get_member_detail(db: Session, user_id: str):
        # Profile, User, interests, core_skills, sns
        profile = (
            db.query(Profile)
            .options(
                joinedload(Profile.user),
                joinedload(Profile.interests),
                joinedload(Profile.core_skills),
                joinedload(Profile.sns),
            )
            .filter(Profile.user_id == user_id)
            .first()
        )
        if not profile:
            return None

        # Tierを複数件取得
        tiers = (
            db.query(Tier)
            .join(UserTier, UserTier.tier_id == Tier.id)
            .filter(UserTier.user_id == user_id)
            .all()
        )

        return profile, tiers
