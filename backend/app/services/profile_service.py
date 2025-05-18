from sqlalchemy.orm import Session
from app.database.repositories.profile_repo import ProfileRepository
from app.schemas.profile_schema import (
    MemberListSchema,
    MemberDetailSchema,
    InterestSchema,
    CoreSkillSchema,
    TierSchema,
    SnsSchema,
    ProfileUpdateSchema,
    SnsUpdateSchema,
)
from app.database.models.user import User
from app.database.models.profile import Interest, CoreSkill

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
        )
        for row in members
    ]
    return result

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
                    link=sns_item.link
                ))

    db.commit()
    return True

def get_member_detail_service(db: Session, user_id: str):
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
    sns = []
    for s in profile.sns:
        # sはSNSインスタンス
        # 中間テーブルからlink値を取得
        link = None
        for assoc in s.profiles:
            if assoc.id == profile.id:
                # SQLAlchemyのデフォルトリレーションではlink値が取れないため、raw SQLで取得する
                from sqlalchemy import select
                from app.database.models.profile import profile_sns_table
                from app.database.session import get_db
                db_session = db if db else get_db()
                stmt = select(profile_sns_table.c.link).where(
                    profile_sns_table.c.profile_id == profile.id,
                    profile_sns_table.c.sns_id == s.id
                )
                result = db_session.execute(stmt).fetchone()
                if result:
                    link = result[0]
                break
        sns.append(SnsSchema(
            id=s.id,
            name=s.name,
            image_url=s.image_url,
            link=link or ""
        ))

    # created_atをYYYY-MM-DD形式に整形
    created_at_str = profile.created_at.strftime("%Y-%m-%d") if profile.created_at else None

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
    )
