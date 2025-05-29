from fastapi import Body, Depends, HTTPException, APIRouter, Query
from datetime import datetime
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.services.monthlyGoal_service import ( create_monthly_goal, get_monthly_goal, get_user_monthly_goals, get_public_monthly_goals, update_monthly_goal, delete_monthly_goal, get_user_current_month_goals, get_user_goals_in_range)
from app.schemas.monthlyGoal_shema import MonthlyGoalCreate, MonthlyGoalUpdate, MonthlyGoalResponse

router = APIRouter(prefix="/morning-goal", tags=["morning-goal"])

@router.post("", response_model=MonthlyGoalResponse)
def create_goal(goal: MonthlyGoalCreate, db: Session = Depends(get_db)):
    """月次目標新規作成"""
    return create_monthly_goal(db, goal)

@router.get("/public", response_model=list[MonthlyGoalResponse])
def get_public_goals(db: Session = Depends(get_db)):
    """公開月次目標一覧取得"""
    return get_public_monthly_goals(db)

@router.get("/{goal_id}", response_model=MonthlyGoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    """月次目標詳細取得"""
    return get_monthly_goal(db, goal_id)

@router.get("/user/{user_id}", response_model=list[MonthlyGoalResponse])
def get_user_goals(user_id: str, db: Session = Depends(get_db)):
    """ユーザーの月次目標一覧取得"""
    return get_user_monthly_goals(db, user_id)

@router.put("/{goal_id}", response_model=MonthlyGoalResponse)
def update_goal(goal_id: int, goal: MonthlyGoalUpdate, db: Session = Depends(get_db)):
    """月次目標更新"""
    return update_monthly_goal(db, goal_id, goal)

@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    """月次目標削除"""
    delete_monthly_goal(db, goal_id)
    return {"result": "deleted"}

@router.get("/user/{user_id}/range", response_model=list[MonthlyGoalResponse])
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

@router.get("/user/{user_id}/current", response_model=list[MonthlyGoalResponse])
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

@router.post("", response_model=MonthlyGoalResponse)
def create_goal(goal: MonthlyGoalCreate, db: Session = Depends(get_db)):
    return create_monthly_goal(db, goal)

@router.get("/public", response_model=list[MonthlyGoalResponse])
def get_public_goals(db: Session = Depends(get_db)):
    return get_public_monthly_goals(db)

@router.get("/{goal_id}", response_model=MonthlyGoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    return get_monthly_goal(db, goal_id)

@router.get("/user/{user_id}", response_model=list[MonthlyGoalResponse])
def get_user_goals(user_id: str, db: Session = Depends(get_db)):
    return get_user_monthly_goals(db, user_id)

@router.put("/{goal_id}", response_model=MonthlyGoalResponse)
def update_goal(goal_id: int, goal: MonthlyGoalUpdate, db: Session = Depends(get_db)):
    return update_monthly_goal(db, goal_id, goal)

@router.delete("/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    delete_monthly_goal(db, goal_id)
    return {"result": "deleted"}

# 指定月の前後1ヶ月を含む3ヶ月分の目標を取得
@router.get("/user/{user_id}/range", response_model=list[MonthlyGoalResponse])
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
@router.get("/user/{user_id}/current", response_model=list[MonthlyGoalResponse])
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
