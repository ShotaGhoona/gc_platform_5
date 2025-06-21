from pydantic import BaseModel, ConfigDict, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    username: Optional[str] = None
    # discord_id: Optional[str] = None

class UserCreate(UserBase):
    clerk_id: str

class UserUpdate(UserBase):
    pass

class UserInDB(UserBase):
    clerk_id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)