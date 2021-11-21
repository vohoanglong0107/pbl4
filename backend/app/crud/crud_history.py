from typing import List

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session, joinedload

from app.crud.base import CRUDBase
from app.models.content import Content
from app.models.history import History
from app.schemas.history import HistoryCreate, HistoryUpdate


class CRUDHistory(CRUDBase[History, HistoryCreate, HistoryUpdate]):
    def create_with_content(
        self, db: Session, *, obj_in: HistoryCreate, content_id: int
    ) -> History:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, content_id=content_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_user(
        self, db: Session, *, user_id: str, skip: int = 0, limit: int = 100
    ) -> List[Content]:
        return (
            db.query(self.model)
            .join(self.model.content)
            .with_entities(Content)
            .filter(self.model.user_id==user_id)
            .order_by(self.model.content)
            .offset(skip)
            .limit(limit)
            .all()
        )


history = CRUDHistory(History)
