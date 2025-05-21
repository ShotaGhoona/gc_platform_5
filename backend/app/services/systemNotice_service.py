from app.schemas.system_notice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse, SystemNoticeTagResponse
from app.database.repositories.systemNotice_repo import SystemNoticeRepository
from fastapi import HTTPException
from sqlalchemy.orm import Session

def get_notice_list(session: Session):
    repo = SystemNoticeRepository(session)
    notices = repo.get_list()
    return [
        SystemNoticeListResponse(
            id=n.id,
            title=n.title,
            description=getattr(n, "description", ""),
            tags=[SystemNoticeTagResponse(id=t.id, name=t.name, color=t.color) for t in getattr(n, "tags", [])],
        )
        for n in notices
    ]

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
        tags=[SystemNoticeTagResponse(id=t.id, name=t.name, color=t.color) for t in notice.tags],
        publish_start_at=notice.publish_start_at,
        publish_end_at=notice.publish_end_at
    )
