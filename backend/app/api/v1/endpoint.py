from fastapi import APIRouter, Depends, HTTPException, Request, status, Query
from datetime import datetime
from sqlalchemy.orm import Session
from app.services.user import UserService, count_users
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from app.database.session import get_db
from typing import Optional
from app.services.systemNotice_service import get_notice_list, get_notice_detail
from app.schemas.systemNotice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse
from app.services.monthlyGoal_service import (
    create_monthly_goal, get_monthly_goal, get_user_monthly_goals, get_public_monthly_goals,
    update_monthly_goal, delete_monthly_goal, get_user_current_month_goals, get_user_goals_in_range
)
from app.schemas.monthlyGoal_shema import MonthlyGoalCreate, MonthlyGoalUpdate, MonthlyGoalResponse

router = APIRouter()

from app.services.tier_service import (
    get_user_tiers,
    get_user_max_tier,
    get_tier_list_with_flag,
)
from app.schemas.tier_schema import TierBase, TierWithFlag

# ==========================
# ユーザー関連
# ==========================

@router.get("/users/count")
def get_user_count(db: Session = Depends(get_db)):
    """ユーザー数を取得"""
    return {"count": count_users(db)}

@router.post("/users/", response_model=UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """ユーザー新規作成"""
    user_service = UserService(db)
    return user_service.create_user(user)

@router.get("/users/{clerk_id}", response_model=UserInDB)
def get_user(clerk_id: str, db: Session = Depends(get_db)):
    """clerk_idでユーザー取得"""
    user_service = UserService(db)
    user = user_service.get_user_by_clerk_id(clerk_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{clerk_id}", response_model=UserInDB)
def update_user(clerk_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    """ユーザー情報更新"""
    user_service = UserService(db)
    updated_user = user_service.update_user(clerk_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

@router.post("/clerk/webhook", status_code=status.HTTP_200_OK)
async def clerk_webhook(request: Request, db: Session = Depends(get_db)):
    """Clerk Webhook受信用エンドポイント"""
    try:
        payload = await request.json()
        event_type = payload.get("type")
        data = payload.get("data", {})
        user_service = UserService(db)

        if event_type == "user.created":
            user = UserCreate(
                clerk_id=data["id"],
                email=data["email_addresses"][0]["email_address"],
                username=data.get("username")
            )
            user_service.create_user(user)
        elif event_type == "user.updated":
            user = UserUpdate(
                email=data["email_addresses"][0]["email_address"],
                username=data.get("username")
            )
            user_service.update_user(data["id"], user)
        elif event_type == "user.deleted":
            db_user = user_service.repository.get_by_clerk_id(data["id"])
            if db_user:
                db.delete(db_user)
                db.commit()
    except Exception as e:
        print("Webhook処理中に例外発生:", e)
    return {"status": "ok"}

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
