from app.database.repositories.attendance_repo import AttendanceRepository
from sqlalchemy.orm import Session
from app.schemas.attendance_schema import (
    MonthlyRankingResponse,
    TotalRankingResponse,
    StreakingRankingResponse,
    Ranker,
)

def get_monthly_ranking(db: Session, month: str, user: str = None, rankingType: str = "All") -> MonthlyRankingResponse:
    """
    指定月の6時出席回数ランキングを返す
    rankingType: "All"（全体） or "Rival"（自分＋ライバルのみ）
    """
    from app.database.models.user import User
    from app.database.models.profile import Profile

    if not month or len(month) != 6:
        raise ValueError("monthはYYYYMM形式で指定してください")
    year = int(month[:4])
    mon = int(month[4:])
    repo = AttendanceRepository(db)
    raw_ranking = repo.get_monthly_ranking(year, mon)

    # user_idリストからUser/Profile情報を取得
    user_ids = [r["user_id"] for r in raw_ranking]

    # ライバルランキングの場合はuserとそのライバルのみ
    if rankingType == "Rival" and user:
        profile = db.query(Profile).filter(Profile.user_id == user).first()
        rival_ids = []
        if profile:
            rival_ids = [r.user_id for r in profile.rivals if r.user_id]
        filter_ids = [user] + rival_ids
        raw_ranking = [r for r in raw_ranking if r["user_id"] in filter_ids]
        user_ids = [r["user_id"] for r in raw_ranking]

    users = db.query(User).filter(User.clerk_id.in_(user_ids)).all()
    user_map = {u.clerk_id: u for u in users}
    profiles = db.query(Profile).filter(Profile.user_id.in_(user_ids)).all()
    profile_map = {p.user_id: p for p in profiles}
    result = []
    for r in raw_ranking:
        user_obj = user_map.get(r["user_id"])
        profile = profile_map.get(r["user_id"])
        name = profile.username if profile and profile.username else (user_obj.username if user_obj and user_obj.username else "NoName")
        icon = profile.avatar_image_url if profile and profile.avatar_image_url else "/images/profile/sampleProfileIcon.png"
        bio = profile.bio if profile and profile.bio else ""
        result.append(Ranker(
            user_id=r["user_id"],
            name=name,
            profile_icon_url=icon,
            bio=bio,
            score=r["count"]
        ))
    # トップ10＋同着（Rivalの場合は全件返す）
    if rankingType != "Rival":
        top_n = 10
        if len(result) > top_n:
            last_score = result[top_n - 1].score
            cutoff = top_n
            while cutoff < len(result) and result[cutoff].score == last_score:
                cutoff += 1
            result = result[:cutoff]
    return MonthlyRankingResponse(ranking=result)

def get_total_ranking(db: Session, user: str = None, rankingType: str = "All") -> TotalRankingResponse:
    """
    全期間の6時出席率ランキング（%）を返す
    rankingType: "All"（全体） or "Rival"（自分＋ライバルのみ）
    """
    from app.database.models.user import User
    from app.database.models.profile import Profile

    repo = AttendanceRepository(db)
    raw_ranking = repo.get_total_ranking()
    user_ids = [r["user_id"] for r in raw_ranking]

    if rankingType == "Rival" and user:
        profile = db.query(Profile).filter(Profile.user_id == user).first()
        rival_ids = []
        if profile:
            rival_ids = [r.user_id for r in profile.rivals if r.user_id]
        filter_ids = [user] + rival_ids
        raw_ranking = [r for r in raw_ranking if r["user_id"] in filter_ids]
        user_ids = [r["user_id"] for r in raw_ranking]

    users = db.query(User).filter(User.clerk_id.in_(user_ids)).all()
    user_map = {u.clerk_id: u for u in users}
    profiles = db.query(Profile).filter(Profile.user_id.in_(user_ids)).all()
    profile_map = {p.user_id: p for p in profiles}
    result = []
    for r in raw_ranking:
        user_obj = user_map.get(r["user_id"])
        profile = profile_map.get(r["user_id"])
        name = profile.username if profile and profile.username else (user_obj.username if user_obj and user_obj.username else "NoName")
        icon = profile.avatar_image_url if profile and profile.avatar_image_url else "/images/profile/sampleProfileIcon.png"
        bio = profile.bio if profile and profile.bio else ""
        result.append(Ranker(
            user_id=r["user_id"],
            name=name,
            profile_icon_url=icon,
            bio=bio,
            score=r["rate"]
        ))
    if rankingType != "Rival":
        top_n = 10
        if len(result) > top_n:
            last_score = result[top_n - 1].score
            cutoff = top_n
            while cutoff < len(result) and result[cutoff].score == last_score:
                cutoff += 1
            result = result[:cutoff]
    return TotalRankingResponse(ranking=result)

def get_streaking_ranking(db: Session, user: str = None, rankingType: str = "All") -> StreakingRankingResponse:
    """
    現在の連続6時出席日数ランキングを返す
    rankingType: "All"（全体） or "Rival"（自分＋ライバルのみ）
    """
    from app.database.models.user import User
    from app.database.models.profile import Profile

    repo = AttendanceRepository(db)
    raw_ranking = repo.get_streaking_ranking()
    user_ids = [r["user_id"] for r in raw_ranking]

    if rankingType == "Rival" and user:
        profile = db.query(Profile).filter(Profile.user_id == user).first()
        rival_ids = []
        if profile:
            rival_ids = [r.user_id for r in profile.rivals if r.user_id]
        filter_ids = [user] + rival_ids
        raw_ranking = [r for r in raw_ranking if r["user_id"] in filter_ids]
        user_ids = [r["user_id"] for r in raw_ranking]

    users = db.query(User).filter(User.clerk_id.in_(user_ids)).all()
    user_map = {u.clerk_id: u for u in users}
    profiles = db.query(Profile).filter(Profile.user_id.in_(user_ids)).all()
    profile_map = {p.user_id: p for p in profiles}
    result = []
    for r in raw_ranking:
        user_obj = user_map.get(r["user_id"])
        profile = profile_map.get(r["user_id"])
        name = profile.username if profile and profile.username else (user_obj.username if user_obj and user_obj.username else "NoName")
        icon = profile.avatar_image_url if profile and profile.avatar_image_url else "/images/profile/sampleProfileIcon.png"
        bio = profile.bio if profile and profile.bio else ""
        result.append(Ranker(
            user_id=r["user_id"],
            name=name,
            profile_icon_url=icon,
            bio=bio,
            score=r["streak"]
        ))
    if rankingType != "Rival":
        top_n = 10
        if len(result) > top_n:
            last_score = result[top_n - 1].score
            cutoff = top_n
            while cutoff < len(result) and result[cutoff].score == last_score:
                cutoff += 1
            result = result[:cutoff]
    return StreakingRankingResponse(ranking=result)

def get_attendance_days_by_month(db, user_id: str, month: str):
    """
    指定ユーザー・指定月（YYYYMM）のsix_clock_flag=Trueの日付リストを返す
    """
    if not month or len(month) != 6:
        raise ValueError("monthはYYYYMM形式で指定してください")
    year = int(month[:4])
    mon = int(month[4:])
    repo = AttendanceRepository(db)
    days = repo.get_attendance_days_by_month(user_id, year, mon)
    # 日付をYYYY-MM-DD文字列で返す
    return {"days": [d.isoformat() for d in days]}
