from sqlalchemy.orm import Session
from sqlalchemy import or_, and_, func
from app.database.models.externalEvent import ExternalEvent, ExternalEventTag
from app.database.models.user import User

class ExternalEventRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_event_list(self, tag_names=None, keyword=None, date_from=None, date_to=None):
        q = self.db.query(ExternalEvent)
        
        # タグ名での配列検索（PostgreSQLの配列演算子を使用）
        if tag_names:
            # tags_arrayの中に指定されたタグ名のいずれかが含まれているかチェック
            tag_conditions = []
            for tag_name in tag_names:
                tag_conditions.append(func.array_position(ExternalEvent.tags_array, tag_name).isnot(None))
            q = q.filter(or_(*tag_conditions))
            
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
        events = q.all()

        # ユーザー情報をまとめて取得
        host_user_ids = [e.host_user_id for e in events if e.host_user_id]
        users = {}
        if host_user_ids:
            user_objs = self.db.query(User).filter(User.clerk_id.in_(host_user_ids)).all()
            users = {str(u.clerk_id): u for u in user_objs}

        # イベントごとにusername/avatarurlを付与
        result = []
        for e in events:
            user = users.get(str(e.host_user_id)) if e.host_user_id else None
            result.append({
                "id": e.id,
                "title": e.title,
                "description": e.description,
                "image": e.image,
                "start_at": e.start_at,
                "end_at": e.end_at,
                "created_at": e.created_at,
                "updated_at": e.updated_at,
                "deleted_at": e.deleted_at,
                "tags": e.tags_array if e.tags_array else [],
                "host_user_id": e.host_user_id,
                "host_user_name":  user.profile.username if user and user.profile else "",
                "host_avatar_image_url": user.profile.avatar_image_url if user and user.profile else "",
            })
        return result

    def get_event_detail(self, event_id: int):
        return self.db.query(ExternalEvent).filter(ExternalEvent.id == event_id, ExternalEvent.deleted_at == None).first()

    def create_event(self, event, tags):
        db_event = ExternalEvent(
            title=event.title,
            description=event.description,
            image=event.image,
            host_user_id=event.host_user_id,
            tags_array=tags if tags else [],
            start_at=event.start_at,
            end_at=event.end_at,
        )
        self.db.add(db_event)
        self.db.commit()
        self.db.refresh(db_event)
        return db_event

    def get_tag_list(self):
        return self.db.query(ExternalEventTag).all()

    def update_event(self, event_id: int, data: dict):
        event = self.db.query(ExternalEvent).filter(ExternalEvent.id == event_id, ExternalEvent.deleted_at == None).first()
        if not event:
            return None
        for k, v in data.items():
            if hasattr(event, k):
                setattr(event, k, v)
        self.db.commit()
        self.db.refresh(event)
        return event

    def delete_event(self, event_id: int):
        event = self.db.query(ExternalEvent).filter(ExternalEvent.id == event_id, ExternalEvent.deleted_at == None).first()
        if not event:
            return False
        from datetime import datetime
        event.deleted_at = datetime.now()
        self.db.commit()
        return True
