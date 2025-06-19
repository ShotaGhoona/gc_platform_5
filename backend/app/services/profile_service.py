from sqlalchemy.orm import Session
from app.database.repositories.profile_repo import ProfileRepository
from app.schemas.profile_schema import ( MemberListSchema, MemberDetailSchema, InterestSchema, CoreSkillSchema, TierSchema, SnsSchema, ProfileUpdateSchema, SnsUpdateSchema,)
from app.database.models.user import User
from app.database.models.profile import Interest, CoreSkill

# get =======================================================


# 細々としたもののGet
def get_interest_list_service(db: Session):
    return db.query(Interest).all()
def get_core_skill_list_service(db: Session):
    return db.query(CoreSkill).all()

def get_member_list_service(db: Session):
    members = ProfileRepository.get_member_list(db)
    result = [
        MemberListSchema(
            user_id=row.user_id,
            username=row.username,
            avatar_image_url=row.avatar_image_url,
            bio=row.bio,
            personal_color=row.personal_color,
        )
        for row in members
    ]
    return result

def get_member_detail_service(db: Session, user_id: str, viewer_id: str = None):
    res = ProfileRepository.get_member_detail(db, user_id)
    if not res:
        return None
    profile, tiers = res

    # usernameはProfileテーブルのカラムを直接利用
    # interests/core_skills
    interests = [InterestSchema.from_orm(i) for i in profile.interests]
    core_skills = [CoreSkillSchema.from_orm(s) for s in profile.core_skills]

    tier_schemas = [TierSchema.from_orm(t) for t in tiers] if tiers else []

    # SNS: 中間テーブルのlink値を取得
    from app.schemas.profile_schema import SnsForMemberSchema
    from sqlalchemy import select
    from app.database.models.profile import profile_sns_table

    sns = []
    for s in profile.sns:
        # 中間テーブルからlink, descriptionを取得
        stmt = select(
            profile_sns_table.c.link,
            profile_sns_table.c.description
        ).where(
            profile_sns_table.c.profile_id == profile.id,
            profile_sns_table.c.sns_id == s.id
        )
        result = db.execute(stmt).fetchone()
        link = result[0] if result else ""
        description = result[1] if result else None
        sns.append(SnsForMemberSchema(
            id=s.id,
            name=s.name,
            description=description,
            link=link or ""
        ))

    # created_atをYYYY-MM-DD形式に整形
    created_at_str = profile.created_at.strftime("%Y-%m-%d") if profile.created_at else None

    # isRival判定
    is_rival = False
    if viewer_id and viewer_id != user_id:
        viewer_profile = db.query(profile.__class__).filter_by(user_id=viewer_id).first()
        if viewer_profile and any(r.user_id == user_id for r in getattr(viewer_profile, "rivals", [])):
            is_rival = True

    return MemberDetailSchema(
        user_id=profile.user_id,
        username=profile.username,
        bio=profile.bio,
        one_line_profile=profile.one_line_profile,
        background=profile.background,
        avatar_image_url=profile.avatar_image_url,
        created_at=created_at_str,
        interests=interests,
        core_skills=core_skills,
        sns=sns,
        tiers=tier_schemas,
        isRival=is_rival,
    )

# 新規作成
def create_profile_service(db: Session, user_id: str, data):
    from app.database.models.profile import Profile, Interest, CoreSkill, SNS, profile_sns_table

    # 既に存在する場合はエラー
    if db.query(Profile).filter(Profile.user_id == user_id).first():
        raise Exception("Profile already exists")

    profile = Profile(
        user_id=user_id,
        username=data.username,
        bio=data.bio,
        one_line_profile=data.one_line_profile,
        background=data.background,
        avatar_image_url=data.avatar_image_url,
    )
    db.add(profile)
    db.commit()
    db.refresh(profile)

    # interests
    if data.interests is not None:
        interests = db.query(Interest).filter(Interest.id.in_(data.interests)).all()
        profile.interests = interests

    # core_skills
    if data.core_skills is not None:
        core_skills = db.query(CoreSkill).filter(CoreSkill.id.in_(data.core_skills)).all()
        profile.core_skills = core_skills

    # SNS
    if data.sns is not None:
        for sns_item in data.sns:
            sns_obj = db.query(SNS).filter(SNS.id == sns_item.id).first()
            if sns_obj:
                db.execute(profile_sns_table.insert().values(
                    profile_id=profile.id,
                    sns_id=sns_obj.id,
                    link=sns_item.link,
                    description=sns_item.description if hasattr(sns_item, "description") else None
                ))

    db.commit()
    return True
# 修正
def update_profile_service(db: Session, user_id: str, data: ProfileUpdateSchema):
    from app.database.models.profile import Profile, Interest, CoreSkill, SNS, profile_sns_table

    profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    if not profile:
        raise Exception("Profile not found")

    # 基本情報
    profile.username = data.username
    profile.bio = data.bio
    profile.one_line_profile = data.one_line_profile
    profile.background = data.background
    profile.avatar_image_url = data.avatar_image_url

    # interests
    if data.interests is not None:
        interests = db.query(Interest).filter(Interest.id.in_(data.interests)).all()
        profile.interests = interests

    # core_skills
    if data.core_skills is not None:
        core_skills = db.query(CoreSkill).filter(CoreSkill.id.in_(data.core_skills)).all()
        profile.core_skills = core_skills

    # SNS
    if data.sns is not None:
        # 既存のSNSリンクを一旦削除
        db.execute(profile_sns_table.delete().where(profile_sns_table.c.profile_id == profile.id))
        for sns_item in data.sns:
            # SNSマスタが存在するか確認
            sns_obj = db.query(SNS).filter(SNS.id == sns_item.id).first()
            if sns_obj:
                db.execute(profile_sns_table.insert().values(
                    profile_id=profile.id,
                    sns_id=sns_obj.id,
                    link=sns_item.link,
                    description=sns_item.description if hasattr(sns_item, "description") else None
                ))

    db.commit()
    return True

# ライバル追加
def add_rival_service(db: Session, user_id: str, target_id: str):
    from app.database.models.profile import Profile
    user_profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    target_profile = db.query(Profile).filter(Profile.user_id == target_id).first()
    if not user_profile or not target_profile:
        return False
    # 最大3人まで
    if len(user_profile.rivals) >= 3:
        return False
    if target_profile not in user_profile.rivals:
        user_profile.rivals.append(target_profile)
        db.commit()
    return True

# ライバル消去
def remove_rival_service(db: Session, user_id: str, target_id: str):
    from app.database.models.profile import Profile
    user_profile = db.query(Profile).filter(Profile.user_id == user_id).first()
    target_profile = db.query(Profile).filter(Profile.user_id == target_id).first()
    if not user_profile or not target_profile:
        return False
    if target_profile in user_profile.rivals:
        user_profile.rivals.remove(target_profile)
        db.commit()
    return True

# ビション取得
def get_vision_service(db: Session, user_id: str):
    return ProfileRepository.get_vision(db, user_id)
