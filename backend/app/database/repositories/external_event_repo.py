from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from app.database.models.externalEvent import ExternalEvent, ExternalEventTag

class ExternalEventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_event_list(self, tag_ids=None, keyword=None, date_from=None, date_to=None):
        q = self.db.query(ExternalEvent)
        if tag_ids:
            q = q.join(ExternalEvent.tags).filter(ExternalEventTag.id.in_(tag_ids))
        if keyword:
            q = q.filter(or_(
                ExternalEvent.title.ilike(f"%{keyword}%"),
                ExternalEvent.description.ilike(f"%{keyword}%")
            ))
        if date_from:
            q = q.filter(ExternalEvent.start_at >= date_from)
        if date_to:
            q = q.filter(ExternalEvent.end_at <= date_to)
        q = q.filter(ExternalEvent.deleted_at == None)
        q = q.order_by(ExternalEvent.start_at.asc())
        return q.all()

    def get_event_detail(self, event_id: int):
        return self.db.query(ExternalEvent).filter(ExternalEvent.id == event_id, ExternalEvent.deleted_at == None).first()

    def create_event(self, event, tag_ids):
        db_event = ExternalEvent(
            title=event.title,
            description=event.description,
            image=event.image,
            host_user_id=event.host_user_id,
            start_at=event.start_at,
            end_at=event.end_at,
        )
        if tag_ids:
            tags = self.db.query(ExternalEventTag).filter(ExternalEventTag.id.in_(tag_ids)).all()
            db_event.tags = tags
        self.db.add(db_event)
        self.db.commit()
        self.db.refresh(db_event)
        return db_event

    def get_tag_list(self):
        return self.db.query(ExternalEventTag).all()
