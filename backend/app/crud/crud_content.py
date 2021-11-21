from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.content import Content
from app.schemas.content import ContentCreate, ContentUpdate


class CRUDContent(CRUDBase[Content, ContentCreate, ContentUpdate]):
    def create(self, db: Session, *, obj_in: ContentCreate) -> Content:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = Content(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


content = CRUDContent(Content)
