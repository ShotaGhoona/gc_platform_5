from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoint import router as api_router
from app.database.session import engine
from app.database.models.user import Base

# データベーステーブルを作成
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