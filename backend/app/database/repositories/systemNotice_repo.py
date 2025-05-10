from app.database.models.systemNotice import SystemNotice
from typing import List, Optional
from sqlalchemy.orm import Session

class SystemNoticeRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_list(self) -> List[SystemNotice]:
        return self.session.query(SystemNotice).filter(SystemNotice.deleted_at.is_(None)).all()

    def get_by_id(self, id: int) -> Optional[SystemNotice]:
        return self.session.query(SystemNotice).filter(
            SystemNotice.id == id,
            SystemNotice.deleted_at.is_(None)
        ).first()
