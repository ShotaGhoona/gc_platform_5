from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
router = APIRouter()

# ==========================
# システムお知らせ関連
# ==========================

from app.services.systemNotice_service import get_notice_list, get_notice_detail
from app.schemas.system_notice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse

@router.get("/system_notices", response_model=list[SystemNoticeListResponse])
def list_system_notices(db: Session = Depends(get_db)):
    return get_notice_list(db)

@router.get("/system_notices/{notice_id}", response_model=SystemNoticeDetailResponse)
def detail_system_notice(notice_id: int, db: Session = Depends(get_db)):
    return get_notice_detail(db, notice_id)