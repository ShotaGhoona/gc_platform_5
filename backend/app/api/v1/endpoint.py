from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.services.user import UserService, count_users
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from app.database.session import get_db
from typing import Optional
from app.services.systemNotice_service import get_notice_list, get_notice_detail
from app.schemas.systemNotice_schema import SystemNoticeListResponse, SystemNoticeDetailResponse
from app.services.monthlyGoal_service import (
    create_monthly_goal, get_monthly_goal, get_user_monthly_goals, get_public_monthly_goals,
    update_monthly_goal, delete_monthly_goal
)
from app.schemas.monthlyGoal_shema import MonthlyGoalCreate, MonthlyGoalUpdate, MonthlyGoalResponse

router = APIRouter()

@router.post("/users/", response_model=UserInDB)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    user_service = UserService(db)
    return user_service.create_user(user)

@router.get("/users/{clerk_id}", response_model=UserInDB)
def get_user(clerk_id: str, db: Session = Depends(get_db)):
    user_service = UserService(db)
    user = user_service.get_user_by_clerk_id(clerk_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{clerk_id}", response_model=UserInDB)
def update_user(clerk_id: str, user: UserUpdate, db: Session = Depends(get_db)):
    user_service = UserService(db)
    updated_user = user_service.update_user(clerk_id, user)
    if not updated_user:
        raise HTTPException(status_code=404, detail="User not found")
    return updated_user

# Clerk Webhook受信用エンドポイント
@router.post("/clerk/webhook", status_code=status.HTTP_200_OK)
async def clerk_webhook(request: Request, db: Session = Depends(get_db)):
    print("=== Clerk Webhook受信 ===")
    try:
        payload = await request.json()
        print("payload:", payload)
        event_type = payload.get("type")
        print("event_type:", event_type)
        data = payload.get("data", {})
        print("data:", data)
        user_service = UserService(db)

        if event_type == "user.created":
            print("user.createdイベント受信")
            user = UserCreate(
                clerk_id=data["id"],
                email=data["email_addresses"][0]["email_address"],
                username=data.get("username")
            )
            print("DB登録前:", user)
            user_service.create_user(user)
            print("DB登録完了")
        elif event_type == "user.updated":
            print("user.updatedイベント受信")
            user = UserUpdate(
                email=data["email_addresses"][0]["email_address"],
                username=data.get("username")
            )
            print("DB更新前:", user)
            user_service.update_user(data["id"], user)
            print("DB更新完了")
        elif event_type == "user.deleted":
            print("user.deletedイベント受信")
            db_user = user_service.repository.get_by_clerk_id(data["id"])
            if db_user:
                print("DB削除対象:", db_user)
                db.delete(db_user)
                db.commit()
                print("DB削除完了")
            else:
                print("DB削除対象なし")
        else:
            print("未対応のevent_type:", event_type)
    except Exception as e:
        print("Webhook処理中に例外発生:", e)
    return {"status": "ok"}

# システムお知らせ関連＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

@router.get("/system_notices", response_model=list[SystemNoticeListResponse])
def list_system_notices(db: Session = Depends(get_db)):
    return get_notice_list(db)

@router.get("/system_notices/{notice_id}", response_model=SystemNoticeDetailResponse)
def detail_system_notice(notice_id: int, db: Session = Depends(get_db)):
    return get_notice_detail(db, notice_id)

# ユーザー関連＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

@router.get("/users/count")
def get_user_count(db: Session = Depends(get_db)):
    return {"count": count_users(db)}

# 月次目標関連＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

@router.post("/monthly_goals", response_model=MonthlyGoalResponse)
def create_goal(goal: MonthlyGoalCreate, db: Session = Depends(get_db)):
    return create_monthly_goal(db, goal)

@router.get("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def get_goal(goal_id: int, db: Session = Depends(get_db)):
    return get_monthly_goal(db, goal_id)

@router.get("/monthly_goals/user/{user_id}", response_model=list[MonthlyGoalResponse])
def get_user_goals(user_id: str, db: Session = Depends(get_db)):
    return get_user_monthly_goals(db, user_id)

@router.get("/monthly_goals/public", response_model=list[MonthlyGoalResponse])
def get_public_goals(db: Session = Depends(get_db)):
    return get_public_monthly_goals(db)

@router.put("/monthly_goals/{goal_id}", response_model=MonthlyGoalResponse)
def update_goal(goal_id: int, goal: MonthlyGoalUpdate, db: Session = Depends(get_db)):
    return update_monthly_goal(db, goal_id, goal)

@router.delete("/monthly_goals/{goal_id}")
def delete_goal(goal_id: int, db: Session = Depends(get_db)):
    delete_monthly_goal(db, goal_id)
    return {"result": "deleted"}


