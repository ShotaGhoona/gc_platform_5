from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.services.grant_tier_service import grant_tier_by_action, get_tier_detail
from app.database.session import get_db

router = APIRouter(prefix="/grant-tier", tags=["tier"])

# アクションを一気に返す
@router.post("/grant")
def grant_tier(
    user_id: str = Query(...),
    action: str = Query(...),
    db: Session = Depends(get_db)
):
    return grant_tier_by_action(db, user_id, action)


@router.get("/{tier_id}")
def get_tier_detail_endpoint(tier_id: int, db: Session = Depends(get_db)):
    return get_tier_detail(db, tier_id)
