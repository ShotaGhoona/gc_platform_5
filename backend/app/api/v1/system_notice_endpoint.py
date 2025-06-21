from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from sqlalchemy.orm import Session
from app.database.session import get_db
router = APIRouter()

# ==========================
# システムお知らせ関連
# ==========================

from app.services.systemNotice_service import get_notice_list, get_notice_detail
from app.schemas.system_notice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse

@router.get("/system_notices", response_model=dict)
def list_system_notices(
    page: int = Query(1, ge=1, description="ページ番号"),
    limit: int = Query(10, ge=1, le=50, description="1ページあたりの件数"),
    db: Session = Depends(get_db)
):
    """システム通知一覧を取得（ページネーション対応）"""
    result = get_notice_list(db, page=page, limit=limit)
    return {
        "notices": result["notices"],
        "total": result["total"],
        "page": page,
        "limit": limit,
        "total_pages": (result["total"] + limit - 1) // limit
    }

@router.get("/system_notices/{notice_id}", response_model=SystemNoticeDetailResponse)
def detail_system_notice(notice_id: int, db: Session = Depends(get_db)):
    return get_notice_detail(db, notice_id)