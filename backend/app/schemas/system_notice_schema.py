from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class SystemNoticeTagResponse(BaseModel):
    id: int
    name: str
    color: str

class SystemNoticeListResponse(BaseModel):
    id: int
    title: str
    description: Optional[str] = ""
    tags: List[str] = []  # tags_array対応：文字列のリスト

class SystemNoticeDetailResponse(BaseModel):
    id: int
    title: str
    description: str
    image_url: str
    tags: List[str] = []  # tags_array対応：文字列のリスト
    publish_start_at: datetime
    publish_end_at: datetime
