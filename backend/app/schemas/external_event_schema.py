from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ExternalEventTag(BaseModel):
    id: int
    name: str
    color: str

    class Config:
        orm_mode = True

class ExternalEventBase(BaseModel):
    title: str
    description: Optional[str]
    image: Optional[str]
    start_at: datetime
    end_at: datetime

class ExternalEventCreate(ExternalEventBase):
    host_user_id: str
    tag_ids: List[int]

class ExternalEvent(ExternalEventBase):
    id: int
    host_user_id: str
    created_at: datetime
    updated_at: Optional[datetime]
    deleted_at: Optional[datetime]
    tags: List[ExternalEventTag]

    class Config:
        orm_mode = True
