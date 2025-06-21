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
        ).order_by(SystemNotice.publish_start_at.desc()).all()
    
    def get_list_paginated(self, page: int = 1, limit: int = 10) -> dict:
        from datetime import datetime
        now = datetime.utcnow()
        
        # ベースクエリ
        base_query = self.session.query(SystemNotice).filter(
            SystemNotice.deleted_at.is_(None),
            (SystemNotice.publish_end_at.is_(None) | (SystemNotice.publish_end_at > now))
        )
        
        # 総件数を取得
        total = base_query.count()
        
        # ページネーション適用
        offset = (page - 1) * limit
        notices = base_query.order_by(SystemNotice.publish_start_at.desc()).offset(offset).limit(limit).all()
        
        return {
            "notices": notices,
            "total": total
        }

    def get_by_id(self, id: int) -> Optional[SystemNotice]:
        return self.session.query(SystemNotice).filter(
            SystemNotice.id == id,
            SystemNotice.deleted_at.is_(None)
        ).first()
