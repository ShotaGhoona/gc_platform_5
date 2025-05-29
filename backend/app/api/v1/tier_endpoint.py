from fastapi import APIRouter, Depends, HTTPException, Query, Body, Path
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.tier_service import (
    get_tier_list_with_flag, get_tier_detail_with_flag, update_user_tier_role, get_main_sub_tiers
)
from app.schemas.tier_schema import (
    TierFlag, TierDetail, TierMainSub
)
from typing import List, Optional
router = APIRouter(prefix="/tiers", tags=["tiers"])

# GET =========================================================================

# 一覧取得
@router.get("/list/with_flag", response_model=List[TierFlag])
def get_tiers_with_flag(
    user_id: str = Query(..., description="Clerk user id"),
    db: Session = Depends(get_db)
):
    return get_tier_list_with_flag(db, user_id)

# 詳細取得
@router.get("/detail/{tier_id}/with_flag", response_model=TierDetail)
def get_tier_detail_with_flag_endpoint(
    tier_id: int,
    user_id: str = Query(..., description="Clerk user id"),
    db: Session = Depends(get_db)
):
    return get_tier_detail_with_flag(db, user_id, tier_id)

# メイン・サブ取得
@router.get("/main_sub", response_model=TierMainSub)
def get_main_sub(
    user_id: str = Query(..., description="Clerk user id"),
    db: Session = Depends(get_db)
):
    return get_main_sub_tiers(db, user_id)



# PATCH =========================================================================

@router.patch("/{tier_id}/role")
def patch_user_tier_role(
    tier_id: int = Path(..., description="TierのID"),
    user_id: str = Body(..., embed=True, description="Clerk user id"),
    role: Optional[str] = Body(None, embed=True, description="'main'|'sub'|None"),
    db: Session = Depends(get_db)
):
    ok, err = update_user_tier_role(db, user_id, tier_id, role)
    if not ok:
        raise HTTPException(status_code=400, detail=err)
    return {"success": True}
