from sqlalchemy.orm import Session
from app.database.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserUpdate, UserInDB
from typing import Optional

class UserService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def create_user(self, user: UserCreate) -> UserInDB:
        db_user = self.repository.create(user)
        return UserInDB.from_orm(db_user)

    def get_user_by_clerk_id(self, clerk_id: str) -> Optional[UserInDB]:
        db_user = self.repository.get_by_clerk_id(clerk_id)
        return UserInDB.from_orm(db_user) if db_user else None

    def get_user_by_email(self, email: str) -> Optional[UserInDB]:
        db_user = self.repository.get_by_email(email)
        return UserInDB.from_orm(db_user) if db_user else None

    def update_user(self, clerk_id: str, user: UserUpdate) -> Optional[UserInDB]:
        db_user = self.repository.update(clerk_id, user)
        return UserInDB.from_orm(db_user) if db_user else None

    def count_users(self, db):
        return self.repository.count()

def count_users(db):
    return UserService(db).repository.count() 