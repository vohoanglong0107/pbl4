from pydantic import BaseModel


# Shared properties
class ContentBase(BaseModel):
    passage: str
    question: str
    answerA: str
    answerB: str
    answerC: str
    answerD: str


# Properties to receive via API on creation
class ContentCreate(ContentBase):
    pass


# Properties to receive via API on update
class ContentUpdate(ContentBase):
    pass


class ContentInDBBase(ContentBase):
    id: int

    class Config:
        orm_mode = True


# Additional properties to return via API
class Content(ContentInDBBase):
    pass


# Additional properties stored in DB
class ContentInDB(ContentInDBBase):
    pass
