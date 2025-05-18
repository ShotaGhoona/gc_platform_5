from sqlalchemy.orm import Session, joinedload
from app.database.models.morning_event import MorningEvent
from app.database.models.user import User

class MorningEventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_morning_event_list(self, date_from=None, date_to=None):
        # イベントと主催者のプロフィール・タグをjoin
        query = (
            self.db.query(MorningEvent)
            .options(
                joinedload(MorningEvent.host_user).joinedload(User.profile),
                joinedload(MorningEvent.morning_event_tags)
            )
        )
        if date_from and date_to:
            query = query.filter(MorningEvent.start_at >= date_from, MorningEvent.start_at <= date_to)
        query = query.filter(MorningEvent.deleted_at == None)
        return query.all()

    def get_morning_event_list_by_user(self, user_id: str, date_from=None, date_to=None):
        # 指定ユーザーが参加予定のイベントのみ
        query = (
            self.db.query(MorningEvent)
            .join(MorningEvent.participants)
            .filter(User.clerk_id == user_id)
            .options(
                joinedload(MorningEvent.host_user).joinedload(User.profile),
                joinedload(MorningEvent.morning_event_tags)
            )
        )
        if date_from and date_to:
            query = query.filter(MorningEvent.start_at >= date_from, MorningEvent.start_at <= date_to)
        query = query.filter(MorningEvent.deleted_at == None)
        return query.all()
    
    def get_morning_event_detail(self, event_id: str):
        # イベント、主催者プロフィール、参加者プロフィール、タグをjoin
        return (
            self.db.query(MorningEvent)
            .options(
                joinedload(MorningEvent.host_user).joinedload(User.profile),
                joinedload(MorningEvent.participants).joinedload(User.profile),
                joinedload(MorningEvent.morning_event_tags)
            )
            .filter(MorningEvent.id == event_id, MorningEvent.deleted_at == None)
            .first()
        )

    def add_participant(self, event_id: str, user_id: str):
        event = self.db.query(MorningEvent).filter(MorningEvent.id == event_id).first()
        user = self.db.query(User).filter(User.clerk_id == user_id).first()
        if not event or not user:
            return False
        if user in event.participants:
            return False
        event.participants.append(user)
        self.db.commit()
        return True

    def cancel_participant(self, event_id: str, user_id: str):
        event = self.db.query(MorningEvent).filter(MorningEvent.id == event_id).first()
        user = self.db.query(User).filter(User.clerk_id == user_id).first()
        if not event or not user:
            return False
        if user not in event.participants:
            return False
        event.participants.remove(user)
        self.db.commit()
        return True
