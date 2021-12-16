from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Content])
def read_histories(
    user_uid: str,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve histories.
    """
    contents = crud.history.get_multi_by_user(
        db=db, user_id=user_uid, skip=skip, limit=limit
    )
    return contents
