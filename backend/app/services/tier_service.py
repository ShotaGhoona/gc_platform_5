from sqlalchemy.orm import Session
from app.database.repositories.tier_repo import get_all_tiers, get_user_tier_ids, get_tier_by_id
from app.schemas.tier_schema import (
    TierFlag, TierDetail, TierMainSub, TierMainSubItem
)
from app.database.models.user_tier import UserTier
from sqlalchemy.exc import SQLAlchemyError

def get_tier_list_with_flag(db: Session, user_id: str):
    all_tiers = get_all_tiers(db)
    user_tier_ids = set(get_user_tier_ids(db, user_id))
    all_tiers = sorted(all_tiers, key=lambda x: x.id)
    return [
        TierFlag(
            id=tier.id,
            badge_color=tier.badge_color,
            flag=(tier.id in user_tier_ids)
        )
        for tier in all_tiers
    ]

def get_tier_detail_with_flag(db: Session, user_id: str, tier_id: int):
    tier = get_tier_by_id(db, tier_id)
    if not tier:
        return None
    user_tier_ids = set(get_user_tier_ids(db, user_id))
    role = None
    user_tier = None
    
    if tier.id in user_tier_ids:
        user_tier = db.query(UserTier).filter(
            UserTier.user_id == user_id,
            UserTier.tier_id == tier_id
        ).first()
        if user_tier:
            role = user_tier.role
            
    return TierDetail(
        id=tier.id,
        title_en=tier.title_en,
        title_ja=tier.title_ja,
        badge_color=tier.badge_color,
        short_description=tier.short_description,
        long_description=tier.long_description,
        story=tier.story,
        has_tier=(tier.id in user_tier_ids),
        role=role,
        user_tier_id=str(user_tier.id) if user_tier else None
    )

def get_main_sub_tiers(db: Session, user_id: str):
    user_tiers = db.query(UserTier).filter(
        UserTier.user_id == user_id,
        UserTier.role.in_(["main", "sub"])
    ).all()
    main = None
    sub = []
    for ut in user_tiers:
        if not ut.tier:
            continue
        item = TierMainSubItem(
            id=ut.tier.id,
            badge_color=ut.tier.badge_color
        )
        if ut.role == "main":
            main = item
        elif ut.role == "sub":
            sub.append(item)
    return TierMainSub(main=main, sub=sub)

def update_user_tier_role(db: Session, user_id: str, tier_id: int, new_role: str | None):
    # user_tier取得
    user_tier = db.query(UserTier).filter(
        UserTier.user_id == user_id,
        UserTier.tier_id == tier_id
    ).first()
    if not user_tier:
        return False, "UserTier not found"

    # 解除の場合
    if new_role is None or new_role == "":
        user_tier.role = None
        db.commit()
        return True, None

    # main/subの数チェック
    if new_role == "main":
        # 既にmainが存在するか
        main_tier = db.query(UserTier).filter(
            UserTier.user_id == user_id,
            UserTier.role == "main",
            UserTier.tier_id != tier_id
        ).first()
        if main_tier:
            return False, "すでにメインカードが設定されています。"
    elif new_role == "sub":
        # subが3つ以上か
        sub_count = db.query(UserTier).filter(
            UserTier.user_id == user_id,
            UserTier.role == "sub",
            UserTier.tier_id != tier_id
        ).count()
        if sub_count >= 3:
            return False, "サブカードは最大3つまでです。"
    else:
        return False, "roleは'main'または'sub'のみ指定できます。"

    # 更新
    user_tier.role = new_role
    try:
        db.commit()
        return True, None
    except SQLAlchemyError as e:
        db.rollback()
        return False, "DBエラー: " + str(e)
