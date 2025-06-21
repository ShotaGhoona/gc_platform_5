from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class MorningEventTag(BaseModel):
    id: str
    name: str
    color: str

    model_config = ConfigDict(from_attributes=True)

class MorningEventParticipant(BaseModel):
    user_id: str
    avatar_image_url: Optional[str]
    user_name: Optional[str]

class MorningEventListItem(BaseModel):
    id: str
    title: str
    description: Optional[str]
    host_avatar_image_url: Optional[str]
    start_at: str
    end_at: str
    tags: List[MorningEventTag]
    is_participating: bool
    is_host: bool

class MorningEventDetail(BaseModel):
    id: str
    title: str
    description: Optional[str]
    host_avatar_image_url: Optional[str]
    host_user_name: Optional[str]
    host_user_id: Optional[str]
    start_at: str
    end_at: str
    tags: List[MorningEventTag]
    participants: List[MorningEventParticipant]
    is_participating: bool
    is_host: bool
