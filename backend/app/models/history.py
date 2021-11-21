from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.db.base_class import Base

if TYPE_CHECKING:
    from .content import Content  # noqa: F401


class History(Base):
    id = Column(Integer, primary_key=True)
    user_id = Column(String, index=True, nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    content = relationship("Content", lazy="joined")
