from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.session import engine
from app.database.models.base import Base

# エンドポイントをimport
from app.api.v1.endpoint import router as api_router
from app.api.v1.system_notice_endpoint import router as system_notice_router
from app.api.v1.external_event_endpoint import router as external_event_router
from app.api.v1.morning_event_endpoint import router as morning_event_router
from app.api.v1.attendance_endpoint import router as attendance_router
from app.api.v1.dashboard_endpoint import router as dashboard_router
from app.api.v1.grant_tier_endpoint import router as grant_tier_router
from app.api.v1.tier_endpoint import router as tier_router
from app.api.v1.vision_setting_endpoint import router as vision_setting_router
from app.api.v1.profile_endpoint import router as profile_router
from app.api.v1.discord_endpoint import router as discord_router
from app.api.v1.morning_goal_endpoint import router as morning_goal_router
# モデルをimport
import app.database.models.user
import app.database.models.systemNotice
import app.database.models.profile
import app.database.models.tier
import app.database.models.monthlyGoal
import app.database.models.user_tier
import app.database.models.attendance

# データベーステーブルを作成
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GC Platform API")

# CORS設定
import os

# Vercel 本番 & プレビュー URL を許可
origins = [
    "http://localhost:3000",  # 開発環境
    "https://gc-platform-5-git-main-shota-yamashitas-projects-c5da0fce.vercel.app",
    "https://gc-platform-5.vercel.app",
]

# 環境変数からも追加可能
if os.getenv("FRONTEND_URL"):
    origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIルーターの登録
app.include_router(api_router, prefix="/api/v1")
app.include_router(system_notice_router, prefix="/api/v1")
app.include_router(external_event_router, prefix="/api/v1")
app.include_router(morning_event_router, prefix="/api/v1")
app.include_router(attendance_router, prefix="/api/v1")
app.include_router(dashboard_router, prefix="/api/v1")
app.include_router(grant_tier_router, prefix="/api/v1")
app.include_router(tier_router, prefix="/api/v1")
app.include_router(vision_setting_router, prefix="/api/v1")
app.include_router(profile_router, prefix="/api/v1")
app.include_router(discord_router, prefix="/api/v1")
app.include_router(morning_goal_router, prefix="/api/v1")


# ヘルスチェックエンドポイント
@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy"}

# ルーティング一覧を起動時に出力
@app.on_event("startup")
def print_routes():
    print("=== FastAPI Registered Routes ===")
    for route in app.routes:
        print(route.path, route.methods)
