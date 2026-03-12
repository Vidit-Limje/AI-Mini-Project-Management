from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class TaskCreate(BaseModel):
    project_id: UUID
    task_title: str
    task_description: Optional[str] = None
    assignee_id: Optional[UUID] = None


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