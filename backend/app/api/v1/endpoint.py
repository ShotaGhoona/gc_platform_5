from fastapi import APIRouter, Depends, HTTPException, Request, status, Query, Body
from datetime import datetime
from sqlalchemy.orm import Session
from app.services.user import UserService, count_users, set_discord_id, get_discord_id
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from app.database.session import get_db
from typing import Optional
from app.services.systemNotice_service import get_notice_list, get_notice_detail
from app.schemas.systemNotice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse
from app.services.monthlyGoal_service import ( create_monthly_goal, get_monthly_goal, get_user_monthly_goals, get_public_monthly_goals, update_monthly_goal, delete_monthly_goal, get_user_current_month_goals, get_user_goals_in_range)
from app.schemas.monthlyGoal_shema import MonthlyGoalCreate, MonthlyGoalUpdate, MonthlyGoalResponse
from app.services.external_event_service import ( get_event_list, get_event_detail, create_event, get_tag_list,)
from app.schemas.external_event_schema import ExternalEvent, ExternalEventCreate, ExternalEventTag
from app.services.tier_service import ( get_user_tiers, get_user_max_tier, get_tier_list_with_flag,)
from app.schemas.tier_schema import TierBase, TierWithFlag
from app.services.profile_service import ( get_member_list_service, get_member_detail_service, update_profile_service, get_interest_list_service, get_core_skill_list_service,)
from app.schemas.profile_schema import MemberListSchema, MemberDetailSchema, ProfileUpdateSchema, InterestSchema, CoreSkillSchema

from app.services.morning_event_service import (
    get_morning_event_list_service,
    get_morning_event_detail_service,
)
from app.services.attendance_service import get_attendance_days_by_month
router = APIRouter()

from app.schemas.attendance_schema import AttendanceDaysResponse

# ==========================
# 出席日関連
# ==========================

@router.get("/attendance/me", response_model=AttendanceDaysResponse)
def api_get_attendance_days_by_month(
    user_id: str = Query(..., description="ユーザーID"),
    month: str = Query(..., description="YYYYMM形式の月"),
    db: Session = Depends(get_db)
):
    """
    指定ユーザーの指定月の出席日（six_clock_flag=Trueの日付）を返す
    """
    print(f"api_get_attendance_days_by_month: {user_id}, {month}")
    return get_attendance_days_by_month(db, user_id=user_id, month=month)






# ==========================
# Discord OAuth2認証エンドポイント
# ==========================
import os
import requests

@router.post("/auth/discord/callback")
def discord_oauth_callback(
    code: str = Body(..., embed=True),
    user_id: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """
    Discord OAuth2認証: 認可コードからdiscord_idを取得し、ユーザーに保存
    """
    client_id = os.getenv("DISCORD_CLIENT_ID")
    client_secret = os.getenv("DISCORD_CLIENT_SECRET")
    redirect_uri = os.getenv("DISCORD_REDIRECT_URI")
    # 1. アクセストークン取得
    token_url = "https://discord.com/api/oauth2/token"
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    token_res = requests.post(token_url, data=data, headers=headers)
    if not token_res.ok:
        raise HTTPException(status_code=400, detail="Failed to get access token")
    access_token = token_res.json().get("access_token")
    # 2. ユーザー情報取得
    user_res = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    if not user_res.ok:
        raise HTTPException(status_code=400, detail="Failed to get user info")
    discord_id = user_res.json().get("id")
    # 3. DBに保存
    from app.services.user import set_discord_id
    result = set_discord_id(db, user_id, discord_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"result": "ok", "discord_id": discord_id}


# ==========================
# Discord連携エンドポイント
# ==========================

@router.post("/users/{user_id}/discord")
def link_discord_account(
    user_id: str,
    discord_id: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """
    ユーザーにdiscord_idを紐付ける
    """
    result = set_discord_id(db, user_id, discord_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"result": "ok"}

@router.get("/users/{user_id}/discord")
def get_user_discord_id(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    ユーザーのdiscord_idを取得
    """
    discord_id = get_discord_id(db, user_id)
    if discord_id is None:
        raise HTTPException(status_code=404, detail="User not found or not linked")
    return {"discord_id": discord_id}
from app.schemas.morning_event_schema import (
    MorningEventListItem,
    MorningEventDetail,
)


# ==========================
# 朝活イベント関連
# ==========================

from datetime import date

@router.get("/morning_event_tags")
def get_morning_event_tags(
    db: Session = Depends(get_db)
):
    """
    朝活イベントタグ一覧取得
    """
    from app.database.models.morning_event import MorningEventTag
    tags = db.query(MorningEventTag).all()
    return [
        {
            "id": str(tag.id),
            "name": tag.name,
            "color": tag.color,
        }
        for tag in tags
    ]

@router.patch("/morning_events/{event_id}")
def update_morning_event(
    event_id: str,
    data: dict,
    db: Session = Depends(get_db)
):
    """
    朝活イベント編集
    """
    from app.services.morning_event_service import update_morning_event_service
    return update_morning_event_service(db, event_id, data)

@router.delete("/morning_events/{event_id}")
def delete_morning_event(
    event_id: str,
    db: Session = Depends(get_db)
):
    """
    朝活イベントソフト削除（deleted_atに日付をセット）
    """
    from app.services.morning_event_service import delete_morning_event_service
    return delete_morning_event_service(db, event_id)

@router.post("/morning_events")
def create_morning_event(
    data: dict,
    db: Session = Depends(get_db)
):
    """
    朝活イベント新規作成
    """
    from app.services.morning_event_service import create_morning_event_service
    return create_morning_event_service(db, data)

@router.get("/morning_events", response_model=list[MorningEventListItem])
def api_get_morning_event_list(
    db: Session = Depends(get_db),
    range: str = Query("this_month", description="this_month/last_month/next_month/all"),
    user_id: str = Query(None, description="ユーザーID")
):
    """
    朝活イベントリスト取得（rangeで絞り込み）
    """
    return get_morning_event_list_service(db, range=range, user_id=user_id)

@router.get("/morning_events/participating", response_model=list[MorningEventListItem])
def api_get_participating_morning_event_list(
    db: Session = Depends(get_db),
    month: str = Query(None, description="YYYYMM形式の月"),
    user_id: str = Query(..., description="ユーザーID")
):
    """
    指定ユーザーが参加 or 主催しているイベントのみ取得（月指定対応）
    """
    from app.services.morning_event_service import get_participating_or_host_morning_event_list_service
    return get_participating_or_host_morning_event_list_service(db, user_id=user_id, month=month)

@router.get("/morning_events/{event_id}", response_model=MorningEventDetail)
def api_get_morning_event_detail(
    event_id: str,
    user_id: str = Query(None, description="ユーザーID"),
    db: Session = Depends(get_db)
):
    """
    朝活イベント詳細取得
    """
    event = get_morning_event_detail_service(db, event_id, user_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# ==========================
# 外部イベント関連
# ==========================

@router.get("/external_events", response_model=list[ExternalEvent])
def api_get_event_list(
    db: Session = Depends(get_db),
    tag_ids: Optional[str] = None,
    keyword: Optional[str] = None,
    date_from: Optional[datetime] = None,
    date_to: Optional[datetime] = None,
):
    """
    ギャラリービュー用イベントリスト取得
    tag_ids: カンマ区切りのタグID
    """
    tag_id_list = [int(t) for t in tag_ids.split(",")] if tag_ids else None
    return get_event_list(db, tag_id_list, keyword, date_from, date_to)

@router.get("/external_events/{event_id}", response_model=ExternalEvent)
def api_get_event_detail(event_id: int, db: Session = Depends(get_db)):
    """イベント詳細取得（サイドピーク用）"""
    event = get_event_detail(db, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/external_events", response_model=ExternalEvent)
def api_create_event(event: ExternalEventCreate, db: Session = Depends(get_db)):
    """イベント追加"""
    return create_event(db, event)

@router.get("/external_event_tags", response_model=list[ExternalEventTag])
def api_get_tag_list(db: Session = Depends(get_db)):
    """タグ一覧取得"""
    return get_tag_list(db)

# ==========================
# ユーザーTier関連
# ==========================

@router.get("/users/{user_id}/tiers", response_model=list[TierBase])
def api_get_user_tiers(user_id: str, db: Session = Depends(get_db)):
    """ユーザーが持つTier一覧取得"""
    return get_user_tiers(db, user_id)

@router.get("/users/{user_id}/tiers/max", response_model=Optional[TierBase])
def api_get_user_max_tier(user_id: str, db: Session = Depends(get_db)):
    """ユーザーが持つTierのうち最大idのもの取得"""
    return get_user_max_tier(db, user_id)

@router.get("/tiers/with_flag", response_model=list[TierWithFlag])
def api_get_tier_list_with_flag(user_id: str, db: Session = Depends(get_db)):
    """全Tier＋ユーザーが持っているかどうかのフラグ付き一覧取得"""
    return get_tier_list_with_flag(db, user_id)

# ==========================
# システムお知らせ関連
# ==========================

@router.get("/system_notices", response_model=list[SystemNoticeListResponse])
def list_system_notices(db: Session = Depends(get_db)):
    """お知らせ一覧取得"""
    return get_notice_list(db)

@router.get("/system_notices/{notice_id}", response_model=SystemNoticeDetailResponse)
def detail_system_notice(notice_id: int, db: Session = Depends(get_db)):
    """お知らせ詳細取得"""
    return get_notice_detail(db, notice_id)

# ==========================
# 月次目標関連
# ==========================

@router.post("/monthly_goals", response_model=MonthlyGoalResponse)
def create_goal(goal: MonthlyGoalCreate, db: Session = Depends(get_db)):
    """月次目標新規作成"""
    return create_monthly_goal(db, goal)

@router.get("/monthly_goals/public", response_model=list[MonthlyGoalResponse])
def get_public_goals(db: Session = Depends(get_db)):
    """公開月次目標一覧取得"""
    return get_public_monthly_goals(db)

@router.get("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """月次目標詳細取得"""
    return get_monthly_goal(db, goal_id)

@router.get("/monthly_goals/user/{user_id}", response_model=list[MonthlyGoalResponse])
def get_user_goals(user_id: str, db: Session = Depends(get_db)):
    """ユーザーの月次目標一覧取得"""
    return get_user_monthly_goals(db, user_id)

@router.put("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def update_goal(goal_id: int, goal: MonthlyGoalUpdate, db: Session = Depends(get_db)):
    """月次目標更新"""
    return update_monthly_goal(db, goal_id, goal)

@router.delete("/monthly_goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    """月次目標削除"""
    delete_monthly_goal(db, goal_id)
    return {"result": "deleted"}

@router.get("/monthly_goals/user/{user_id}/range", response_model=list[MonthlyGoalResponse])
def get_user_goals_3months(
    user_id: str,
    center: str = Query(..., description="YYYY-MM形式"),
    db: Session = Depends(get_db)
):
    """指定月の前後1ヶ月を含む3ヶ月分の目標を取得"""
    center_date = datetime.strptime(center, "%Y-%m")
    months = [
        (center_date.year, center_date.month - 1),
        (center_date.year, center_date.month),
        (center_date.year, center_date.month + 1),
    ]
    dates = []
    for y, m in months:
        if m < 1:
            y -= 1
            m += 12
        elif m > 12:
            y += 1
            m -= 12
        dates.append(datetime(y, m, 1).date())
    start = dates[0]
    if dates[2].month == 12:
        end = datetime(dates[2].year + 1, 1, 1).date()
    else:
        end = datetime(dates[2].year, dates[2].month + 1, 1).date()
    return get_user_goals_in_range(db, user_id, start, end)

@router.get("/monthly_goals/user/{user_id}/current", response_model=list[MonthlyGoalResponse])
def get_user_current_month_goals_endpoint(
    user_id: str,
    month: str = Query(None, description="YYYY-MM形式で指定された場合その月の目標のみ返す"),
    db: Session = Depends(get_db)
):
    """ユーザーの今月の目標を取得"""
    if month:
        from datetime import datetime
        start = datetime.strptime(month, "%Y-%m").date()
        if start.month == 12:
            end = datetime(start.year + 1, 1, 1).date()
        else:
            end = datetime(start.year, start.month + 1, 1).date()
        from app.services.monthlyGoal_service import get_user_goals_in_range
        return get_user_goals_in_range(db, user_id, start, end)
    else:
        return get_user_current_month_goals(db, user_id)

@router.post("/monthly_goals", response_model=MonthlyGoalResponse)
def create_goal(goal: MonthlyGoalCreate, db: Session = Depends(get_db)):
    return create_monthly_goal(db, goal)

@router.get("/monthly_goals/public", response_model=list[MonthlyGoalResponse])
def get_public_goals(db: Session = Depends(get_db)):
    return get_public_monthly_goals(db)

@router.get("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    return get_monthly_goal(db, goal_id)

@router.get("/monthly_goals/user/{user_id}", response_model=list[MonthlyGoalResponse])
def get_user_goals(user_id: str, db: Session = Depends(get_db)):
    return get_user_monthly_goals(db, user_id)

@router.put("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def update_goal(goal_id: int, goal: MonthlyGoalUpdate, db: Session = Depends(get_db)):
    return update_monthly_goal(db, goal_id, goal)

@router.delete("/monthly_goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    delete_monthly_goal(db, goal_id)
    return {"result": "deleted"}

# 指定月の前後1ヶ月を含む3ヶ月分の目標を取得
@router.get("/monthly_goals/user/{user_id}/range", response_model=list[MonthlyGoalResponse])
def get_user_goals_3months(
    user_id: str,
    center: str = Query(..., description="YYYY-MM形式"),
    db: Session = Depends(get_db)
):
    # centerをdatetimeに変換
    center_date = datetime.strptime(center, "%Y-%m")
    # 前月・当月・翌月の1日を計算
    months = [
        (center_date.year, center_date.month - 1),
        (center_date.year, center_date.month),
        (center_date.year, center_date.month + 1),
    ]
    # 月の繰り上がり・繰り下がり処理
    dates = []
    for y, m in months:
        if m < 1:
            y -= 1
            m += 12
        elif m > 12:
            y += 1
            m -= 12
        dates.append(datetime(y, m, 1).date())
    start = dates[0]
    # 翌月の翌月1日
    if dates[2].month == 12:
        end = datetime(dates[2].year + 1, 1, 1).date()
    else:
        end = datetime(dates[2].year, dates[2].month + 1, 1).date()
    return get_user_goals_in_range(db, user_id, start, end)

# ユーザーの今月の目標を取得
@router.get("/monthly_goals/user/{user_id}/current", response_model=list[MonthlyGoalResponse])
def get_user_current_month_goals_endpoint(
    user_id: str,
    month: str = Query(None, description="YYYY-MM形式で指定された場合その月の目標のみ返す"),
    db: Session = Depends(get_db)
):
    if month:
        from datetime import datetime
        start = datetime.strptime(month, "%Y-%m").date()
        # 翌月1日
        if start.month == 12:
            end = datetime(start.year + 1, 1, 1).date()
        else:
            end = datetime(start.year, start.month + 1, 1).date()
        # サービス層で範囲取得
        from app.services.monthlyGoal_service import get_user_goals_in_range
        return get_user_goals_in_range(db, user_id, start, end)
    else:
        return get_user_current_month_goals(db, user_id)

# ==========================
# プロフィール選択肢関連
# ==========================
@router.get("/interests", response_model=list[InterestSchema])
def get_interests(db: Session = Depends(get_db)):
    return get_interest_list_service(db)

@router.get("/core_skills", response_model=list[CoreSkillSchema])
def get_core_skills(db: Session = Depends(get_db)):
    return get_core_skill_list_service(db)

# ==========================
# メンバー関連
# ==========================
@router.get("/members", response_model=list[MemberListSchema])
def get_members(db: Session = Depends(get_db)):
    return get_member_list_service(db)

@router.get("/members/{user_id}", response_model=MemberDetailSchema)
def get_member_detail(user_id: str, db: Session = Depends(get_db)):
    member = get_member_detail_service(db, user_id)
    if not member:
        raise HTTPException(status_code=404, detail="Member not found")
    return member

from fastapi import Body, Request
import json

@router.post("/morning_events/{event_id}/join")
def join_morning_event(
    event_id: str,
    user_id: str = Query(..., description="ユーザーID"),
    db: Session = Depends(get_db)
):
    """
    イベント参加API: 指定イベントの参加者にユーザーを追加
    """
    from app.services.morning_event_service import join_morning_event_service
    result = join_morning_event_service(db, event_id, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Event not found or already joined")
    return {"result": "ok"}

@router.post("/morning_events/{event_id}/cancel")
def cancel_morning_event(
    event_id: str,
    user_id: str = Query(..., description="ユーザーID"),
    db: Session = Depends(get_db)
):
    """
    イベント参加キャンセルAPI: 指定イベントの参加者のcanceled_atをセット
    """
    from app.services.morning_event_service import cancel_morning_event_service
    result = cancel_morning_event_service(db, event_id, user_id)
    if not result:
        raise HTTPException(status_code=404, detail="Event not found or not joined")
    return {"result": "ok"}

@router.put("/members/{user_id}/profile")
async def update_member_profile(user_id: str, request: Request, db: Session = Depends(get_db)):
    try:
        form = await request.form()
        data_json = form.get("data")
        if not data_json:
            raise HTTPException(status_code=422, detail="No data field in form")
        data_dict = json.loads(data_json)
        from app.schemas.profile_schema import ProfileUpdateSchema
        data = ProfileUpdateSchema(**data_dict)
        update_profile_service(db, user_id, data)
        return {"result": "ok"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
