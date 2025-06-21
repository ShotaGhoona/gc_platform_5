from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
router = APIRouter()


# ==========================
# 外部イベント関連
# ==========================

from app.services.external_event_service import ( get_event_list, get_event_detail, create_event, get_tag_list,)
from app.schemas.external_event_schema import ExternalEvent, ExternalEventCreate, ExternalEventTag
from typing import Optional
from datetime import datetime

# ギャラリービュー用イベントリスト
@router.get("/external_events")
def api_get_event_list(
    db: Session = Depends(get_db),
    tag_names: Optional[str] = None,
    keyword: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
):
    tag_name_list = [t.strip() for t in tag_names.split(",")] if tag_names else None
    return get_event_list(db, tag_name_list, keyword, date_from, date_to)

# 詳細取得（サイドピーク用）
@router.get("/external_events/{event_id}")
def api_get_event_detail(event_id: int, db: Session = Depends(get_db)):
    event = get_event_detail(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# 追加
@router.post("/external_events")
def api_create_event(event: ExternalEventCreate, db: Session = Depends(get_db)):
    return create_event(db, event)

# 編集
@router.patch("/external_events/{event_id}")
def api_update_event(event_id: int, event: dict, db: Session = Depends(get_db)):
    from app.services.external_event_service import update_event
    return update_event(db, event_id, event)

# 削除
@router.delete("/external_events/{event_id}")
def api_delete_event(event_id: int, db: Session = Depends(get_db)):
    from app.services.external_event_service import delete_event
    return delete_event(db, event_id)

# タグ一覧取得（フィルターモーダル用）
@router.get("/external_event_tags", response_model=list[ExternalEventTag])
def api_get_tag_list(db: Session = Depends(get_db)):
    return get_tag_list(db)