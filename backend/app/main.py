from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoint import router as api_router
from app.database.session import engine
from app.database.models.base import Base  # ←ここを修正
# モデルをimport
import app.database.models.user
import app.database.models.systemNotice
import app.database.models.profile
import app.database.models.tier
import app.database.models.monthlyGoal

# データベーステーブルを作成
print(Base.metadata.tables)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GC Platform API")

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# APIルーターの登録
app.include_router(api_router, prefix="/api/v1")