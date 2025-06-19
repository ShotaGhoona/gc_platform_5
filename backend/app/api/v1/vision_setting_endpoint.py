from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.services.vision_setting_service import generate_vision_ideas, update_vision
from app.database.session import get_db
from sqlalchemy.orm import Session

router = APIRouter()

class VisionChatRequest(BaseModel):
    messages: list
    mode: str

class VisionConfirmRequest(BaseModel):
    user_id: str
    vision: str

@router.post("/vision/chat")
async def vision_chat(request: VisionChatRequest):
    mode, reply, ideas = generate_vision_ideas(request.messages, request.mode)
    return {"mode": mode, "reply": reply, "ideas": ideas}

@router.patch("/vision/confirm")
async def vision_confirm(request: VisionConfirmRequest, db: Session = Depends(get_db)):
    ok = update_vision(db, request.user_id, request.vision)
    if not ok:
        raise HTTPException(status_code=404, detail="Profile not found")
    return {"message": "Vision updated"}
