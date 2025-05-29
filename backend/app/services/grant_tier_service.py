from app.database.models.user_tier import UserTier
from app.database.models.tier import Tier
from datetime import datetime

def grant_tier_by_action(db, user_id: str, action: str):
    # === 新しいアクションを追加する場合はこのディクショナリに追記 ===
    # 例: "new_action": 4,
    action_tier_map = {
        "login": 1,
        "profile_complete": 2,
        "full_attendance": 3,
        # 必要に応じて追加
    }
    tier_id = action_tier_map.get(action)
    if not tier_id:
        return {"granted": False, "message": f"Unknown action: {action}"}
    # すでに付与済みかチェック
    exists = db.query(UserTier).filter_by(user_id=user_id, tier_id=tier_id).first()
    if exists:
        return {"granted": False, "message": "Already granted"}
    # 付与
    new_user_tier = UserTier(user_id=user_id, tier_id=tier_id, granted_at=datetime.utcnow())
    db.add(new_user_tier)
    db.commit()
    db.refresh(new_user_tier)
    return {"granted": True, "user_tier": {
        "user_id": user_id,
        "tier_id": tier_id,
        "granted_at": new_user_tier.granted_at
    }}

# 詳細モーダル用
def get_tier_detail(db, tier_id: int):
    tier = db.query(Tier).filter(Tier.id == tier_id).first()
    if not tier:
        return {"error": "Tier not found"}
    return {
        "id": tier.id,
        "title_en": tier.title_en,
        "title_ja": tier.title_ja,
        "badge_color": tier.badge_color,
        "card_image_url": tier.card_image_url,
        "short_description": tier.short_description,
        "long_description": tier.long_description,
    }
