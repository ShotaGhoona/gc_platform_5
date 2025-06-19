from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.database.repositories.attendance_repo import AttendanceRepository
from app.database.repositories.morning_event_repo import MorningEventRepository

import calendar
from collections import defaultdict

class DashboardService:
    def __init__(self, db: Session):
        self.db = db
        self.attendance_repo = AttendanceRepository(db)
        self.morning_event_repo = MorningEventRepository(db)
    def get_weekly_stats(self, user_id: str, start: str = None, end: str = None):
        """
        曜日ごとの出席率（%）を「自分」「全体平均」「ライバル」で返す
        start, end: YYYY-MM-DD 形式の文字列
        """
        # 0:月, ..., 6:日
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

        # 全ユーザーのclerk_idリスト取得
        from app.database.models.user import User
        from app.database.models.profile import Profile
        users = self.db.query(User).all()
        user_ids = [u.clerk_id for u in users]

        # 全期間のAttendanceFlagを取得
        from app.database.models.attendance import AttendanceFlag
        query = self.db.query(AttendanceFlag).filter(AttendanceFlag.six_clock_flag == True)
        if start:
            from datetime import datetime
            query = query.filter(AttendanceFlag.date >= datetime.strptime(start, "%Y-%m-%d").date())
        if end:
            from datetime import datetime
            query = query.filter(AttendanceFlag.date <= datetime.strptime(end, "%Y-%m-%d").date())
        all_flags = query.all()

        # 日付ごとに曜日を算出
        # 分母: 全期間の各曜日の日数
        from datetime import timedelta

        # 分母もstart, endで絞った期間のみに修正
        date_query = self.db.query(AttendanceFlag.date)
        if start:
            from datetime import datetime
            date_query = date_query.filter(AttendanceFlag.date >= datetime.strptime(start, "%Y-%m-%d").date())
        if end:
            from datetime import datetime
            date_query = date_query.filter(AttendanceFlag.date <= datetime.strptime(end, "%Y-%m-%d").date())
        all_dates = date_query.distinct().all()
        all_dates = [d[0] for d in all_dates]
        if not all_dates:
            return {"labels": labels, "Me": [0]*7, "Average": [0]*7}

        min_date = min(all_dates)
        max_date = max(all_dates)
        total_days = (max_date - min_date).days + 1

        # 各曜日の全日数
        weekday_total = [0]*7
        for i in range(total_days):
            d = min_date + timedelta(days=i)
            weekday_total[d.weekday()] += 1

        # 自分の出席日（six_clock_flag=True）を曜日ごとにカウント
        my_flags = [f for f in all_flags if f.user_id == user_id]
        my_weekday_count = [0]*7
        for f in my_flags:
            my_weekday_count[f.date.weekday()] += 1

        # 全ユーザーごとの曜日別出席率
        user_weekday_rates = []
        for uid in user_ids:
            u_flags = [f for f in all_flags if f.user_id == uid]
            u_count = [0]*7
            for f in u_flags:
                u_count[f.date.weekday()] += 1
            # 各曜日の出席率（分母0の場合は0%）
            u_rate = [
                (u_count[i] / weekday_total[i] * 100) if weekday_total[i] > 0 else 0
                for i in range(7)
            ]
            user_weekday_rates.append(u_rate)

        # 平均を算出
        average = [
            round(sum(user_weekday_rates[j][i] for j in range(len(user_weekday_rates))) / len(user_weekday_rates), 1)
            if user_weekday_rates else 0
            for i in range(7)
        ]
        # 自分の出席率
        me = [
            round((my_weekday_count[i] / weekday_total[i] * 100), 1) if weekday_total[i] > 0 else 0
            for i in range(7)
        ]

        # ライバル取得
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        rivals = []
        if profile:
            for rival in profile.rivals:
                if rival.user_id:
                    rivals.append({"user_id": rival.user_id, "username": rival.username})

        # ライバルごとの出席率
        rival_stats = {}
        for rival in rivals:
            rival_flags = [f for f in all_flags if f.user_id == rival["user_id"]]
            rival_weekday_count = [0]*7
            for f in rival_flags:
                rival_weekday_count[f.date.weekday()] += 1
            rival_rate = [
                round((rival_weekday_count[i] / weekday_total[i] * 100), 1) if weekday_total[i] > 0 else 0
                for i in range(7)
            ]
            rival_stats[f"{rival['username']}"] = rival_rate

        result = {
            "labels": labels,
            "Me": me,
            "Average": average
        }
        result.update(rival_stats)
        return result
    def get_attendance_user_profile(self, user_id: str = None, start: str = None, end: str = None, attendanceType: str = "today"):
        """
        出席ユーザーのプロフィール画像一覧を返す
        attendanceType:
          - "today": 今日出席したユーザー
          - "rival": start-endの期間で自分とライバルの出席ユーザー
        """
        from datetime import date, datetime
        from app.database.models.attendance import AttendanceFlag
        from app.database.models.profile import Profile

        if attendanceType == "today":
            today = date.today()
            flags = (
                self.db.query(AttendanceFlag)
                .filter(
                    AttendanceFlag.date == today,
                    AttendanceFlag.six_clock_flag == True,
                )
                .all()
            )
            user_ids = list({f.user_id for f in flags})
            if not user_ids:
                return []
            profiles = (
                self.db.query(Profile)
                .filter(Profile.user_id.in_(user_ids))
                .all()
            )
            return [
                {
                    "user_id": p.user_id,
                    "username": p.username,
                    "avatar_image_url": p.avatar_image_url,
                }
                for p in profiles
            ]
        elif attendanceType == "rival" and user_id and start and end:
            # 自分とライバルのuser_idリスト取得
            profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
            rival_ids = []
            if profile:
                rival_ids = [r.user_id for r in profile.rivals if r.user_id]
            filter_ids = [user_id] + rival_ids

            # 指定期間の出席ユーザー（six_clock_flag=Trueのみ）
            start_date = datetime.strptime(start, "%Y-%m-%d").date()
            end_date = datetime.strptime(end, "%Y-%m-%d").date()
            flags = (
                self.db.query(AttendanceFlag)
                .filter(
                    AttendanceFlag.date >= start_date,
                    AttendanceFlag.date <= end_date,
                    AttendanceFlag.six_clock_flag == True,
                    AttendanceFlag.user_id.in_(filter_ids),
                )
                .all()
            )
            # 日付ごとにuser_idリストをグループ化
            from collections import defaultdict
            date_user_map = defaultdict(list)
            for f in flags:
                date_user_map[f.date].append(f.user_id)
            # プロフィールをまとめて取得
            all_user_ids = set()
            for ids in date_user_map.values():
                all_user_ids.update(ids)
            profiles = (
                self.db.query(Profile)
                .filter(Profile.user_id.in_(all_user_ids))
                .all()
            )
            profile_map = {p.user_id: p for p in profiles}
            # 日付ごとにプロフィールリストを返す
            result = {}
            for date, user_ids in date_user_map.items():
                result[date.isoformat()] = [
                    {
                        "user_id": p.user_id,
                        "username": p.username,
                        "avatar_image_url": p.avatar_image_url,
                    }
                    for uid in user_ids if (p := profile_map.get(uid))
                ]
            return result
        else:
            return []
    def get_weekly_flow(self, user_id: str, start: str = None, end: str = None):
        """
        週ごとの出席数（自分・全体平均・ライバル）を返す
        start, end: YYYY-MM-DD 形式の文字列
        """
        from app.database.models.attendance import AttendanceFlag
        from app.database.models.user import User
        from app.database.models.profile import Profile
        from datetime import date, datetime

        # 全ユーザー
        users = self.db.query(User).all()
        user_ids = [u.clerk_id for u in users]

        # 全期間のAttendanceFlag
        query = self.db.query(AttendanceFlag).filter(AttendanceFlag.six_clock_flag == True)
        if start:
            query = query.filter(AttendanceFlag.date >= datetime.strptime(start, "%Y-%m-%d").date())
        if end:
            query = query.filter(AttendanceFlag.date <= datetime.strptime(end, "%Y-%m-%d").date())
        all_flags = query.all()

        # 週ごとにグルーピング
        # 週ラベルは "YYYY-WW" (ISO週番号)
        def get_week_label(d):
            return d.strftime("%Y-%W")

        # 指定ユーザーの初参加日を取得
        my_flags = [f for f in all_flags if f.user_id == user_id]
        if not my_flags:
            return {"labels": [], "Me": [], "Average": []}
        first_date = min(f.date for f in my_flags)

        # その日以降の週ラベルのみ抽出
        all_weeks = sorted({get_week_label(f.date) for f in all_flags if f.date >= first_date})
        week_index = {w: i for i, w in enumerate(all_weeks)}

        # 自分の週ごとの出席数
        my_week_count = [0] * len(all_weeks)
        for f in my_flags:
            if f.date >= first_date:
                idx = week_index[get_week_label(f.date)]
                my_week_count[idx] += 1

        # 全ユーザーごとの週ごと出席数（期間を合わせる）
        user_week_counts = []
        for uid in user_ids:
            u_flags = [f for f in all_flags if f.user_id == uid and f.date >= first_date]
            u_count = [0] * len(all_weeks)
            for f in u_flags:
                idx = week_index[get_week_label(f.date)]
                u_count[idx] += 1
            user_week_counts.append(u_count)

        # 各週ごとの全体平均
        average = []
        for i in range(len(all_weeks)):
            week_total = sum(u[i] for u in user_week_counts)
            avg = round(week_total / len(user_week_counts), 2) if user_week_counts else 0
            average.append(avg)

        # ライバル取得
        profile = self.db.query(Profile).filter(Profile.user_id == user_id).first()
        rivals = []
        if profile:
            for rival in profile.rivals:
                if rival.user_id:
                    rivals.append({"user_id": rival.user_id, "username": rival.username})

        # ライバルごとの週ごと出席数
        rival_flows = {}
        for rival in rivals:
            rival_flags = [f for f in all_flags if f.user_id == rival["user_id"] and f.date >= first_date]
            rival_week_count = [0] * len(all_weeks)
            for f in rival_flags:
                idx = week_index[get_week_label(f.date)]
                rival_week_count[idx] += 1
            rival_flows[f"{rival['username']}"] = rival_week_count

        result = {
            "labels": all_weeks,
            "Me": my_week_count,
            "Average": average
        }
        result.update(rival_flows)
        return result
    def get_dashboard_summary(self, user_id: str):
        now = datetime.now()
        # 今月
        this_year = now.year
        this_month = now.month
        # 先月
        if this_month == 1:
            last_year = this_year - 1
            last_month = 12
        else:
            last_year = this_year
            last_month = this_month - 1

        # 今月の出席日数
        attendance_days_this_month = self.attendance_repo.get_attendance_days_by_month(user_id, this_year, this_month)
        # 先月の出席日数
        attendance_days_last_month = self.attendance_repo.get_attendance_days_by_month(user_id, last_year, last_month)
        # 総出席日数
        total_attendance_days = self.attendance_repo.get_total_attendance_days(user_id)
        # 連続参加回数
        streaks = self.attendance_repo.get_streaking_ranking()
        streak = next((s["streak"] for s in streaks if s["user_id"] == user_id), 0)

        # イベント参加回数（今月・先月）
        def get_month_range(year, month):
            from calendar import monthrange
            start = datetime(year, month, 1)
            end = datetime(year, month, monthrange(year, month)[1], 23, 59, 59)
            return start, end

        this_month_start, this_month_end = get_month_range(this_year, this_month)
        last_month_start, last_month_end = get_month_range(last_year, last_month)

        events_this_month = self.morning_event_repo.get_morning_event_list_by_user(user_id, this_month_start, this_month_end)
        events_last_month = self.morning_event_repo.get_morning_event_list_by_user(user_id, last_month_start, last_month_end)

        # イベント開催回数（今月・先月）
        hosted_events_this_month = [
            e for e in self.morning_event_repo.get_morning_event_list(this_month_start, this_month_end)
            if e.host_user_id == user_id
        ]
        hosted_events_last_month = [
            e for e in self.morning_event_repo.get_morning_event_list(last_month_start, last_month_end)
            if e.host_user_id == user_id
        ]

        return {
            "attendance_this_month": {
                "value": len(attendance_days_this_month),
                "diff": len(attendance_days_this_month) - len(attendance_days_last_month)
            },
            "attendance_total": {
                "value": total_attendance_days
            },
            "streak": {
                "value": streak
            },
            "participated_events_this_month": {
                "value": len(events_this_month),
                "diff": len(events_this_month) - len(events_last_month)
            },
            "hosted_events_this_month": {
                "value": len(hosted_events_this_month),
                "diff": len(hosted_events_this_month) - len(hosted_events_last_month)
            }
        }
