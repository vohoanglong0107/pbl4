from typing import Any

from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.post("/qa/")
async def inference_qa(user_uid: str, content: schemas.ContentCreate, db: Session = Depends(deps.get_db)) -> Any:
    history = schemas.HistoryCreate(user_id=user_uid)
    content = crud.content.create(db=db, obj_in=content)
    history = crud.history.create_with_content(
        db=db, obj_in=history, content_id=content.id
    )

    return RedirectResponse(f"{settings.TORCH_SERVE_PREFIX}/qa/")


@router.post("/ocr/")
async def inference_ocr() -> Any:
    return RedirectResponse(f"{settings.TORCH_SERVE_PREFIX}/ocr/")
