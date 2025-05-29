from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.services.dashboard_service import DashboardService
from app.database.session import get_db

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("/summary/")
def get_dashboard_summary(
    user: str = Query(..., description="User ID"), 
    db: Session = Depends(get_db)
):
    service = DashboardService(db)
    return service.get_dashboard_summary(user)

@router.get("/weekly-stats")
def get_weekly_stats(
    user: str = Query(..., description="User ID"),
    start: str = Query(None, description="開始日 (YYYY-MM-DD)"),
    end: str = Query(None, description="終了日 (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    service = DashboardService(db)
    return service.get_weekly_stats(user, start, end)

@router.get("/attendance-user-profile")
def get_attendance_user_profile(
    user_id: str = Query(None, description="ユーザーID"),
    start: str = Query(None, description="開始日 (YYYY-MM-DD)"),
    end: str = Query(None, description="終了日 (YYYY-MM-DD)"),
    attendanceType: str = Query("today", description="today or rival"),
    db: Session = Depends(get_db)
):
    service = DashboardService(db)
    return service.get_attendance_user_profile(user_id=user_id, start=start, end=end, attendanceType=attendanceType)

@router.get("/weekly-flow")
def get_weekly_flow(
    user: str = Query(..., description="User ID"),
    start: str = Query(None, description="開始日 (YYYY-MM-DD)"),
    end: str = Query(None, description="終了日 (YYYY-MM-DD)"),
    db: Session = Depends(get_db)
):
    service = DashboardService(db)
    return service.get_weekly_flow(user, start, end)
