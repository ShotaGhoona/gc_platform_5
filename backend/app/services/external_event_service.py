from sqlalchemy.orm import Session
from app.database.repositories.external_event_repo import ExternalEventRepository
from app.schemas.external_event_schema import ExternalEvent, ExternalEventCreate, ExternalEventTag

def get_event_list(db: Session, tag_ids=None, keyword=None, date_from=None, date_to=None):
    repo = ExternalEventRepository(db)
    events = repo.get_event_list(tag_ids, keyword, date_from, date_to)
    return [ExternalEvent.from_orm(e) for e in events]

def get_event_detail(db: Session, event_id: int):
    repo = ExternalEventRepository(db)
    event = repo.get_event_detail(event_id)
    return ExternalEvent.from_orm(event) if event else None

def create_event(db: Session, event_create: ExternalEventCreate):
    repo = ExternalEventRepository(db)
    db_event = repo.create_event(event_create, event_create.tag_ids)
    return ExternalEvent.from_orm(db_event)

def get_tag_list(db: Session):
    repo = ExternalEventRepository(db)
    tags = repo.get_tag_list()
    return [ExternalEventTag.from_orm(t) for t in tags]
