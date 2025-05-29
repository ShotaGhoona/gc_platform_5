from app.database.models.systemNotice import SystemNotice
from typing import List, Optional
from sqlalchemy.orm import Session

class SystemNoticeRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_list(self) -> List[SystemNotice]:
        from datetime import datetime
        now = datetime.utcnow()
        return self.session.query(SystemNotice).filter(
            SystemNotice.deleted_at.is_(None),
            (SystemNotice.publish_end_at.is_(None) | (SystemNotice.publish_end_at > now))
        ).all()

    def get_by_id(self, id: int) -> Optional[SystemNotice]:
        return self.session.query(SystemNotice).filter(
            SystemNotice.id == id,
            SystemNotice.deleted_at.is_(None)
        ).first()
