from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import reading

app = FastAPI()
app.include_router(reading.router)

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
