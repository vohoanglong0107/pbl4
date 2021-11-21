from fastapi import APIRouter

from .routers import history, torchserve_inference

api_router = APIRouter()
api_router.include_router(torchserve_inference.router)
api_router.include_router(history.router, prefix="/history")
