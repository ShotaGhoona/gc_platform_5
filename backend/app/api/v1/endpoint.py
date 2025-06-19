from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from datetime import datetime
from sqlalchemy.orm import Session
from app.services.user import UserService, count_users, set_discord_id, get_discord_id
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from fastapi.responses import JSONResponse
from app.database.session import get_db
from app.services.profile_service import ( get_member_list_service, get_member_detail_service, update_profile_service, get_interest_list_service, get_core_skill_list_service, get_vision_service)
from app.schemas.profile_schema import MemberListSchema, MemberDetailSchema, ProfileUpdate, InterestSchema, CoreSkillSchema, VisionSchema


router = APIRouter()


@router.get("/users/count")
def api_get_user_count(db: Session = Depends(get_db)):
    """
    ユーザー数を返す
    """
    count = count_users(db)
    return JSONResponse(content={"count": count})

