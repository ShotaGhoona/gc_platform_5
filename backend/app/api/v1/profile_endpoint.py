from fastapi import Body, Depends, HTTPException, APIRouter, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.profile_service import ( get_interest_list_service, get_core_skill_list_service, get_member_list_service, get_member_detail_service, add_rival_service, remove_rival_service, get_vision_service, create_profile_service, update_profile_service)
from app.schemas.profile_schema import InterestSchema, CoreSkillSchema, MemberListSchema, MemberDetailSchema, VisionSchema

router = APIRouter()

# ==========================
# プロフィール選択肢関連
# ==========================
@router.get("/interests", response_model=list[InterestSchema])
def get_interests(db: Session = Depends(get_db)):
    return get_interest_list_service(db)

@router.get("/core_skills", response_model=list[CoreSkillSchema])
def get_core_skills(db: Session = Depends(get_db)):
    return get_core_skill_list_service(db)

# ==========================
# メンバー関連
# ==========================
@router.get("/members", response_model=list[MemberListSchema])
def get_members(db: Session = Depends(get_db)):
    return get_member_list_service(db)

@router.get("/members/detail/{user_id}", response_model=MemberDetailSchema)
def get_member_detail(
    user_id: str,
    viewer_id: str = Query(None, description="プロフィールを開いた（ログイン中の）ユーザーID"),
    db: Session = Depends(get_db)
):
    member = get_member_detail_service(db, user_id, viewer_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member

@router.post("/members/{user_id}/rival")
def add_rival(
    user_id: str,
    target_id: str = Body(..., embed=True, description="ライバルに追加するユーザーID"),
    db: Session = Depends(get_db)
):
    from app.services.profile_service import add_rival_service
    result = add_rival_service(db, user_id, target_id)
    if not result:
        raise HTTPException(status_code=400, detail="Failed to add rival")
    return {"result": "ok"}

@router.delete("/members/{user_id}/rival")
def remove_rival(
    user_id: str,
    target_id: str = Body(..., embed=True, description="ライバルから解除するユーザーID"),
    db: Session = Depends(get_db)
):
    from app.services.profile_service import remove_rival_service
    result = remove_rival_service(db, user_id, target_id)
    if not result:
        raise HTTPException(status_code=400, detail="Failed to remove rival")
    return {"result": "ok"}

@router.get("/profile/vision/{user_id}", response_model=VisionSchema)
def get_profile_vision(user_id: str, db: Session = Depends(get_db)):
    vision = get_vision_service(db, user_id)
    if vision is None:
        raise HTTPException(status_code=404, detail="Vision not found")
    return {"vision": vision}

from fastapi import Body, Request
import json

@router.post("/members/{user_id}/profile")
async def create_member_profile(user_id: str, request: Request, db: Session = Depends(get_db)):
    try:
        form = await request.form()
        data_json = form.get("data")
        if not data_json:
            raise HTTPException(status_code=422, detail="No data field in form")
        data_dict = json.loads(data_json)
        from app.schemas.profile_schema import ProfileUpdate
        data = ProfileUpdate(**data_dict)
        # 既に存在する場合は409
        from app.database.models.profile import Profile
        if db.query(Profile).filter(Profile.user_id == user_id).first():
            raise HTTPException(status_code=409, detail="Profile already exists")
        from app.services.profile_service import create_profile_service
        create_profile_service(db, user_id, data)
        return {"result": "created"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/members/{user_id}/profile")
async def update_member_profile(user_id: str, request: Request, db: Session = Depends(get_db)):
    try:
        form = await request.form()
        data_json = form.get("data")
        if not data_json:
            raise HTTPException(status_code=422, detail="No data field in form")
        data_dict = json.loads(data_json)
        from app.schemas.profile_schema import ProfileUpdate
        data = ProfileUpdate(**data_dict)
        update_profile_service(db, user_id, data)
        return {"result": "ok"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
