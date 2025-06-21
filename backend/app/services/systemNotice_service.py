from app.schemas.system_notice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse, SystemNoticeTagResponse
from app.database.repositories.systemNotice_repo import SystemNoticeRepository
from fastapi import HTTPException
from sqlalchemy.orm import Session

def get_notice_list(session: Session, page: int = 1, limit: int = 10):
    repo = SystemNoticeRepository(session)
    result = repo.get_list_paginated(page=page, limit=limit)
    notices = result["notices"]
    
    return {
        "notices": [
            SystemNoticeListResponse(
                id=n.id,
                title=n.title,
                description=getattr(n, "description", "")[:50] + ("..." if len(getattr(n, "description", "")) > 50 else ""),
                tags=getattr(n, "tags_array", []) or [],  # tags_arrayを直接使用
            )
            for n in notices
        ],
        "total": result["total"]
    }

def get_notice_detail(session: Session, id: int):
    repo = SystemNoticeRepository(session)
    notice = repo.get_by_id(id)
    if not notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return SystemNoticeDetailResponse(
        id=notice.id,
        title=notice.title,
        description=notice.description,
        image_url=notice.image_url,
        tags=getattr(notice, "tags_array", []) or [],  # tags_arrayを直接使用
        publish_start_at=notice.publish_start_at,
        publish_end_at=notice.publish_end_at
    )
