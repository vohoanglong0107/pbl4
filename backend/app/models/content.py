from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class Content(Base):
    id = Column(Integer, primary_key=True)
    passage = Column(String)
    question = Column(String)
    answerA = Column(String)
    answerB = Column(String)
    answerC = Column(String)
    answerD = Column(String)
