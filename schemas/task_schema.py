from pydantic import BaseModel
from uuid import UUID

class TaskCreate(BaseModel):
    project_id: UUID
    task_title: str
    task_description: str
    priority: str
    assignee_id: UUID | None = None


class TaskUpdate(BaseModel):
    task_title: str | None = None
    task_description: str | None = None
    status: str | None = None
    priority: str | None = None


class TaskResponse(BaseModel):
    task_id: UUID
    task_title: str
    task_description: str
    status: str
    priority: str

    class Config:
        from_attributes = True