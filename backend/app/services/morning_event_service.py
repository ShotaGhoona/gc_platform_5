from app.database.repositories.morning_event_repo import MorningEventRepository
from app.schemas.morning_event_schema import (MorningEventListItem,MorningEventDetail,MorningEventParticipant,MorningEventTag)
from typing import List, Optional
from sqlalchemy.orm import Session
from datetime import date, datetime
import calendar

# タグ一覧取得
def get_morning_event_tags_service(db: Session) -> List[MorningEventTag]:
    return db.query(MorningEventTag).all()

# 一覧取得
def get_morning_event_list_service(db: Session, range: str = "this_month", user_id: str = None) -> List[MorningEventListItem]:
    from datetime import date
    import calendar

    today = date.today()
    date_from = date_to = None

    if range == "this_month":
        year, mon = today.year, today.month
        date_from = date(year, mon, 1)
        last_day = calendar.monthrange(year, mon)[1]
        date_to = date(year, mon, last_day)
    elif range == "last_month":
        year = today.year
        mon = today.month - 1
        if mon == 0:
            year -= 1
            mon = 12
        date_from = date(year, mon, 1)
        last_day = calendar.monthrange(year, mon)[1]
        date_to = date(year, mon, last_day)
    elif range == "next_month":
        year = today.year
        mon = today.month + 1
        if mon == 13:
            year += 1
            mon = 1
        date_from = date(year, mon, 1)
        last_day = calendar.monthrange(year, mon)[1]
        date_to = date(year, mon, last_day)
    elif range == "all":
        date_from = date_to = None
    else:
        # 不正な値の場合は全件返す
        date_from = date_to = None

    repo = MorningEventRepository(db)
    events = repo.get_morning_event_list(date_from, date_to)
    result = []
    for event in events:
        host_profile = event.host_user.profile if event.host_user and event.host_user.profile else None
        tags = [
            MorningEventTag(
                id=str(tag.id),
                name=tag.name,
                color=tag.color
            ) for tag in event.morning_event_tags
        ]
        # 参加判定（単純なリスト判定）
        is_participating = False
        if user_id and hasattr(event, "participants"):
            active_clerk_ids = [u.clerk_id for u in event.participants]
            is_participating = user_id in active_clerk_ids
        result.append(
            MorningEventListItem(
                id=str(event.id),
                title=event.title,
                description=event.description,
                host_avatar_image_url=host_profile.avatar_image_url if host_profile else None,
                start_at=event.start_at.isoformat() if event.start_at else None,
                end_at=event.end_at.isoformat() if event.end_at else None,
                tags=tags,
                is_participating=is_participating,
                is_host=False,
            )
        )
    return result

# 参加 or 主催しているイベントのみ返す（月指定対応）
def get_participating_or_host_morning_event_list_service(db: Session, user_id: str, month: str = None) -> List[MorningEventListItem]:
    """
    指定ユーザーが参加 or 主催しているイベントのみ返す（月指定対応）
    """
    date_from = date_to = None
    if month and len(month) == 6:
        year = int(month[:4])
        mon = int(month[4:])
        date_from = date(year, mon, 1)
        last_day = calendar.monthrange(year, mon)[1]
        date_to = date(year, mon, last_day)
    # monthが未指定の場合は全件

    repo = MorningEventRepository(db)
    events = repo.get_morning_event_list(date_from, date_to)
    result = []
    seen = set()
    for event in events:
        is_participant = bool(user_id and hasattr(event, "participants") and user_id in [u.clerk_id for u in event.participants])
        is_host = bool(event.host_user and event.host_user.clerk_id == user_id)
        if not (is_participant or is_host):
            continue
        if str(event.id) in seen:
            continue
        seen.add(str(event.id))
        host_profile = event.host_user.profile if event.host_user and event.host_user.profile else None
        tags = [
            MorningEventTag(
                id=str(tag.id),
                name=tag.name,
                color=tag.color
            ) for tag in event.morning_event_tags
        ]
        result.append(
            MorningEventListItem(
                id=str(event.id),
                title=event.title,
                description=event.description,
                host_avatar_image_url=host_profile.avatar_image_url if host_profile else None,
                host_user_id=event.host_user.clerk_id if event.host_user else None,
                start_at=event.start_at.isoformat() if event.start_at else None,
                end_at=event.end_at.isoformat() if event.end_at else None,
                tags=tags,
                is_host=is_host,
                is_participating=is_participant,
            )
        )
    return result

# 詳細取得
def get_morning_event_detail_service(db: Session, event_id: str, user_id: str = None) -> MorningEventDetail:
    repo = MorningEventRepository(db)
    event = repo.get_morning_event_detail(event_id)
    if not event:
        return None
    host_profile = event.host_user.profile if event.host_user and event.host_user.profile else None
    # 参加者リスト（単純なリスト）
    participants = []
    for user in event.participants:
        profile = user.profile if user.profile else None
        participants.append(
            MorningEventParticipant(
                user_id=user.clerk_id,
                avatar_image_url=profile.avatar_image_url if profile else None,
                user_name=profile.username if profile else None,
            )
        )
    tags = [
        MorningEventTag(
            id=str(tag.id),
            name=tag.name,
            color=tag.color
        ) for tag in event.morning_event_tags
    ]
    if user_id and hasattr(event, "participants"):
        is_participating = user_id in [u.clerk_id for u in event.participants]
    else:
        is_participating = False
    is_host = bool(event.host_user and event.host_user.clerk_id == user_id)
    host_user_id = event.host_user.clerk_id if hasattr(event.host_user, "clerk_id") else None
    return MorningEventDetail(
        id=str(event.id),
        title=event.title,
        description=event.description,
        host_avatar_image_url=host_profile.avatar_image_url if host_profile else None,
        host_user_name=host_profile.username if host_profile else None,
        host_user_id=host_user_id,
        start_at=event.start_at.isoformat() if event.start_at else None,
        end_at=event.end_at.isoformat() if event.end_at else None,
        tags=tags,
        participants=participants,
        is_participating=is_participating,
        is_host=is_host,
    )

# 参加
def join_morning_event_service(db: Session, event_id: str, user_id: str) -> bool:
    repo = MorningEventRepository(db)
    event = repo.get_morning_event_detail(event_id)
    if not event:
        return False
    # 既に参加済みなら何もしない
    if any(getattr(u, "clerk_id", None) == user_id for u in getattr(event, "participants", [])):
        return False
    repo.add_participant(event_id, user_id)
    return True
# キャンセル
def cancel_morning_event_service(db: Session, event_id: str, user_id: str) -> bool:
    repo = MorningEventRepository(db)
    return repo.cancel_participant(event_id, user_id)
# 作成
def create_morning_event_service(db: Session, data: dict):
    from app.database.models.morning_event import MorningEvent, MorningEventTag
    from app.database.models.user import User
    from datetime import datetime

    # 必須項目
    title = data.get("title")
    start_at = data.get("start_at")
    end_at = data.get("end_at")
    tag_ids = data.get("tags", [])
    description = data.get("description", "")
    host_user_id = data.get("host_user_id")

    if not (title and start_at and end_at and host_user_id):
        raise Exception("必須項目が不足しています")

    host_user = db.query(User).filter(User.clerk_id == host_user_id).first()
    if not host_user:
        raise Exception("ホストユーザーが見つかりません")

    event = MorningEvent(
        title=title,
        description=description,
        start_at=datetime.fromisoformat(start_at),
        end_at=datetime.fromisoformat(end_at),
        host_user_id=host_user.clerk_id,
    )
    # タグの紐付け（IDで取得し中間テーブルで紐付け）
    tag_objs = []
    for tag_id in tag_ids:
        tag = db.query(MorningEventTag).filter(MorningEventTag.id == tag_id).first()
        if tag:
            tag_objs.append(tag)
    event.morning_event_tags = tag_objs

    db.add(event)
    db.commit()
    db.refresh(event)
    return {"result": "ok", "event_id": str(event.id)}
# 更新
def update_morning_event_service(db: Session, event_id: str, data: dict):
    from app.database.models.morning_event import MorningEvent, MorningEventTag
    from datetime import datetime

    event = db.query(MorningEvent).filter(MorningEvent.id == event_id).first()
    if not event:
        raise Exception("Event not found")

    # フィールドごとに上書き
    if "title" in data:
        event.title = data["title"]
    if "description" in data:
        event.description = data["description"]
    if "start_at" in data:
        event.start_at = datetime.fromisoformat(data["start_at"])
    if "end_at" in data:
        event.end_at = datetime.fromisoformat(data["end_at"])
    if "tags" in data:
        tag_ids = data["tags"]
        tag_objs = []
        for tag_id in tag_ids:
            tag = db.query(MorningEventTag).filter(MorningEventTag.id == tag_id).first()
            if tag:
                tag_objs.append(tag)
        event.morning_event_tags = tag_objs

    db.commit()
    db.refresh(event)
    return {"result": "ok", "event_id": str(event.id)}
# 消去
def delete_morning_event_service(db: Session, event_id: str):
    from app.database.models.morning_event import MorningEvent
    from datetime import datetime
    event = db.query(MorningEvent).filter(MorningEvent.id == event_id).first()
    if not event:
        raise Exception("Event not found")
    event.deleted_at = datetime.now()
    db.commit()
    return {"result": "ok"}
