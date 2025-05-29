from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
router = APIRouter()



# ==========================
# 出席日関連
# ==========================

from app.services.attendance_service import (
    get_attendance_days_by_month,
    get_monthly_ranking,
    get_total_ranking,
    get_streaking_ranking,
)
from app.schemas.attendance_schema import (
    AttendanceDaysResponse,
    MonthlyRankingResponse,
    TotalRankingResponse,
    StreakingRankingResponse,
)


@router.get("/attendance/me", response_model=AttendanceDaysResponse)
def api_get_attendance_days_by_month(
    user_id: str = Query(..., description="ユーザーID"),
    month: str = Query(..., description="YYYYMM形式の月"),
    db: Session = Depends(get_db)
):
    return get_attendance_days_by_month(db, user_id=user_id, month=month)


@router.get("/attendance/ranking/monthly", response_model=MonthlyRankingResponse)
def api_get_monthly_ranking(
    month: str = Query(..., description="YYYYMM形式の月"),
    user: str = Query(None, description="ユーザーID"),
    rankingType: str = Query("All", description="ランキングタイプ: All or Rival"),
    db: Session = Depends(get_db)
):
    return get_monthly_ranking(db, month=month, user=user, rankingType=rankingType)


@router.get("/attendance/ranking/total", response_model=TotalRankingResponse)
def api_get_total_ranking(
    user: str = Query(None, description="ユーザーID"),
    rankingType: str = Query("All", description="ランキングタイプ: All or Rival"),
    db: Session = Depends(get_db)
):
    return get_total_ranking(db, user=user, rankingType=rankingType)


@router.get("/attendance/ranking/streaking", response_model=StreakingRankingResponse)
def api_get_streaking_ranking(
    user: str = Query(None, description="ユーザーID"),
    rankingType: str = Query("All", description="ランキングタイプ: All or Rival"),
    db: Session = Depends(get_db)
):
    return get_streaking_ranking(db, user=user, rankingType=rankingType)
