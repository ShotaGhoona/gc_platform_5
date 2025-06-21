from sqlalchemy.orm import Session
from app.database.repositories.external_event_repo import ExternalEventRepository
from app.schemas.external_event_schema import ExternalEvent, ExternalEventCreate, ExternalEventTag
from app.database.models.externalEvent import ExternalEventTag as ExternalEventTagModel

def get_event_list(db: Session, tag_names=None, keyword=None, date_from=None, date_to=None):
    repo = ExternalEventRepository(db)
    events = repo.get_event_list(tag_names, keyword, date_from, date_to)
    return events  # dictのリストをそのまま返す

def get_event_detail(db: Session, event_id: int):
    repo = ExternalEventRepository(db)
    event = repo.get_event_detail(event_id)
    if event:
        # tags_arrayを文字列リストに変換してレスポンス
        event_dict = {
            "id": event.id,
            "title": event.title,
            "description": event.description,
            "image": event.image,
            "start_at": event.start_at,
            "end_at": event.end_at,
            "created_at": event.created_at,
            "updated_at": event.updated_at,
            "deleted_at": event.deleted_at,
            "host_user_id": event.host_user_id,
            "tags": event.tags_array if event.tags_array else []
        }
        return event_dict
    return None

def create_event(db: Session, event_create: ExternalEventCreate):
    repo = ExternalEventRepository(db)
    
    # タグID配列を名前配列に変換
    tag_names = []
    if event_create.tags:
        # 既存のタグIDから名前を取得し、カスタムタグも含める
        existing_tags = db.query(ExternalEventTagModel).all()
        tag_id_to_name = {tag.id: tag.name for tag in existing_tags}
        
        for tag in event_create.tags:
            if isinstance(tag, int):
                # IDの場合は名前に変換
                if tag in tag_id_to_name:
                    tag_names.append(tag_id_to_name[tag])
            elif isinstance(tag, str):
                # 文字列の場合はそのまま追加（カスタムタグ）
                tag_names.append(tag)
    
    db_event = repo.create_event(event_create, tag_names)
    
    # レスポンス用のdictを作成
    event_dict = {
        "id": db_event.id,
        "title": db_event.title,
        "description": db_event.description,
        "image": db_event.image,
        "start_at": db_event.start_at,
        "end_at": db_event.end_at,
        "created_at": db_event.created_at,
        "updated_at": db_event.updated_at,
        "deleted_at": db_event.deleted_at,
        "host_user_id": db_event.host_user_id,
        "tags": db_event.tags_array if db_event.tags_array else []
    }
    return event_dict

def get_tag_list(db: Session):
    repo = ExternalEventRepository(db)
    tags = repo.get_tag_list()
    return [ExternalEventTag.from_orm(t) for t in tags]

def update_event(db: Session, event_id: int, data: dict):
    repo = ExternalEventRepository(db)
    
    # tagsがIDの場合は名前に変換
    if 'tags' in data:
        tag_names = []
        existing_tags = db.query(ExternalEventTagModel).all()
        tag_id_to_name = {tag.id: tag.name for tag in existing_tags}
        
        for tag in data['tags']:
            if isinstance(tag, int):
                if tag in tag_id_to_name:
                    tag_names.append(tag_id_to_name[tag])
            elif isinstance(tag, str):
                tag_names.append(tag)
        
        data['tags_array'] = tag_names
        del data['tags']  # 元のtagsキーを削除
    
    updated = repo.update_event(event_id, data)
    if not updated:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Event not found")
    
    # レスポンス用のdictを作成
    event_dict = {
        "id": updated.id,
        "title": updated.title,
        "description": updated.description,
        "image": updated.image,
        "start_at": updated.start_at,
        "end_at": updated.end_at,
        "created_at": updated.created_at,
        "updated_at": updated.updated_at,
        "deleted_at": updated.deleted_at,
        "host_user_id": updated.host_user_id,
        "tags": updated.tags_array if updated.tags_array else []
    }
    return event_dict

def delete_event(db: Session, event_id: int):
    repo = ExternalEventRepository(db)
    success = repo.delete_event(event_id)
    if not success:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Event not found")
    return {"result": "deleted"}
