from pydantic import BaseModel
from uuid import UUID
from typing import Optional


# -------------------------
# CREATE TASK
# -------------------------
class TaskCreate(BaseModel):
    project_id: UUID
    task_title: str

    # optional manual fields
    task_description: Optional[str] = None
    priority: Optional[str] = None

    assignee_id: Optional[UUID] = None

    # AI generation flag
    use_ai: bool = True


# -------------------------
# UPDATE TASK
# -------------------------
class TaskUpdate(BaseModel):
    task_title: Optional[str] = None
    task_description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    assignee_id: Optional[UUID] = None


# -------------------------
# RESPONSE MODEL
# -------------------------
class TaskResponse(BaseModel):
    task_id: UUID
    project_id: UUID
    task_title: str
    task_description: str
    status: str
    priority: str
    assignee_id: Optional[UUID] = None

    class Config:
        from_attributes = True