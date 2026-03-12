from fastapi import FastAPI

from routers import user_router
from routers import project_router
from routers import comment_router
from routers import task_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",  # React Vite frontend
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)
app.include_router(project_router.router)
app.include_router(comment_router.router)
app.include_router(task_router.router)