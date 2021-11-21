from pydantic import BaseModel


# Shared properties
class HistoryBase(BaseModel):
    user_id: str


# Properties to receive on History creation
class HistoryCreate(HistoryBase):
    pass


# Properties to receive on History update
class HistoryUpdate(HistoryBase):
    pass


# Properties shared by models stored in DB
class HistoryInDBBase(HistoryBase):
    id: int
    content_id: int

    class Config:
        orm_mode = True


# Properties to return to client
class History(HistoryInDBBase):
    pass


# Properties properties stored in DB
class HistoryInDB(HistoryInDBBase):
    pass
