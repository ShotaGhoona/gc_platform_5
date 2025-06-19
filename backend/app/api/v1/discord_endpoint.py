from fastapi import Body, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from app.database.session import get_db
import os
import requests

router = APIRouter()


@router.post("/auth/discord/callback")
def discord_oauth_callback(
    code: str = Body(..., embed=True),
    user_id: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """
    Discord OAuth2認証: 認可コードからdiscord_idを取得し、ユーザーに保存
    """
    client_id = os.getenv("DISCORD_CLIENT_ID")
    client_secret = os.getenv("DISCORD_CLIENT_SECRET")
    redirect_uri = os.getenv("DISCORD_REDIRECT_URI")
    # 1. アクセストークン取得
    token_url = "https://discord.com/api/oauth2/token"
    data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    token_res = requests.post(token_url, data=data, headers=headers)
    if not token_res.ok:
        raise HTTPException(status_code=400, detail="Failed to get access token")
    access_token = token_res.json().get("access_token")
    # 2. ユーザー情報取得
    user_res = requests.get(
        "https://discord.com/api/users/@me",
        headers={"Authorization": f"Bearer {access_token}"}
    )
    if not user_res.ok:
        raise HTTPException(status_code=400, detail="Failed to get user info")
    discord_id = user_res.json().get("id")
    # 3. DBに保存
    from app.services.user import set_discord_id
    result = set_discord_id(db, user_id, discord_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"result": "ok", "discord_id": discord_id}


# ==========================
# Discord連携エンドポイント
# ==========================

@router.post("/users/{user_id}/discord")
def link_discord_account(
    user_id: str,
    discord_id: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    """
    ユーザーにdiscord_idを紐付ける
    """
    result = set_discord_id(db, user_id, discord_id)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return {"result": "ok"}

@router.get("/users/{user_id}/discord")
def get_user_discord_id(
    user_id: str,
    db: Session = Depends(get_db)
):
    """
    ユーザーのdiscord_idを取得
    """
    discord_id = get_discord_id(db, user_id)
    if discord_id is None:
        raise HTTPException(status_code=404, detail="User not found or not linked")
    return {"discord_id": discord_id}

