from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
router = APIRouter()


# ==========================
# 朝活イベント関連
# ==========================

from app.schemas.morning_event_schema import MorningEventListItem, MorningEventDetail, MorningEventTag
from app.services.morning_event_service import (
    get_morning_event_list_service,
    get_morning_event_detail_service,
    get_morning_event_tags_service,
    get_participating_or_host_morning_event_list_service,
    join_morning_event_service,
    cancel_morning_event_service,
    create_morning_event_service, 
    update_morning_event_service, 
    delete_morning_event_service
)
@router.get("/morning_event_tags", response_model=list[MorningEventTag])
def get_morning_event_tags(
    db: Session = Depends(get_db)
):
    return get_morning_event_tags_service(db)

@router.get("/morning_events_list", response_model=list[MorningEventListItem])
def api_get_morning_event_list(
    db: Session = Depends(get_db),
    range: str = Query("this_month", description="this_month/last_month/next_month/all"),
    user_id: str = Query(None)
):
    return get_morning_event_list_service(db, range=range, user_id=user_id)

@router.get("/morning_events/participating", response_model=list[MorningEventListItem])
def api_get_participating_morning_event_list(
    db: Session = Depends(get_db),
    month: str = Query(None),
    user_id: str = Query(..., description="ユーザーID")
):
    return get_participating_or_host_morning_event_list_service(db, user_id=user_id, month=month)

@router.get("/morning_events/{event_id}", response_model=MorningEventDetail)
def api_get_morning_event_detail(
    event_id: str,
    user_id: str = Query(None),
    db: Session = Depends(get_db)
):
    return get_morning_event_detail_service(db, event_id, user_id)

# =======================================================================================

# 参加
@router.post("/morning_events/{event_id}/join")
def join_morning_event(
    event_id: str,
    user_id: str = Query(..., description="ユーザーID"),
    db: Session = Depends(get_db)
):
    return join_morning_event_service(db, event_id, user_id)

# キャンセル
@router.post("/morning_events/{event_id}/cancel")
def cancel_morning_event(
    event_id: str,
    user_id: str = Query(..., description="ユーザーID"),
    db: Session = Depends(get_db)
):
    return cancel_morning_event_service(db, event_id, user_id)

# 作成
@router.post("/morning_events")
def create_morning_event(
    data: dict,
    db: Session = Depends(get_db)
):
    return create_morning_event_service(db, data)

# 更新
@router.patch("/morning_events/{event_id}")
def update_morning_event(
    event_id: str,
    data: dict,
    db: Session = Depends(get_db)
):
    return update_morning_event_service(db, event_id, data)

# 削除
@router.delete("/morning_events/{event_id}")
def delete_morning_event(
    event_id: str,
    db: Session = Depends(get_db)
):
    return delete_morning_event_service(db, event_id)
