from pydantic import BaseModel
from typing import List
from datetime import datetime

class SystemNoticeTagResponse(BaseModel):
    id: int
    name: str
    color: str

class SystemNoticeListResponse(BaseModel):
    id: int
    title: str
    publish_start_at: datetime

class SystemNoticeDetailResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str
    tags: List[SystemNoticeTagResponse]
    publish_start_at: datetime
    publish_end_at: datetime
