from sqlalchemy.orm import Session
from app.database.models.user import User
from app.schemas.user import UserCreate, UserUpdate

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, user: UserCreate) -> User:
        db_user = User(
            clerk_id=user.clerk_id,
            email=user.email,
            username=user.username
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def get_by_clerk_id(self, clerk_id: str) -> User:
        return self.db.query(User).filter(User.clerk_id == clerk_id).first()

    def get_by_email(self, email: str) -> User:
        return self.db.query(User).filter(User.email == email).first()

    def update(self, clerk_id: str, user: UserUpdate) -> User:
        db_user = self.get_by_clerk_id(clerk_id)
        if db_user:
            for key, value in user.dict(exclude_unset=True).items():
                setattr(db_user, key, value)
            self.db.commit()
            self.db.refresh(db_user)
        return db_user

    def count(self) -> int:
        return self.db.query(User).count() 