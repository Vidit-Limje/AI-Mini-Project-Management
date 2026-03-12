from fastapi import FastAPI

from routers import user_router
from routers import project_router
from routers import comment_router
from routers import task_router

app = FastAPI()

app.include_router(user_router.router)
app.include_router(project_router.router)
app.include_router(comment_router.router)
app.include_router(task_router.router)