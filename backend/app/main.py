from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import api

app = FastAPI()
app.include_router(api.api_router)

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
