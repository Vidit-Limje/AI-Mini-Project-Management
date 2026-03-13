from pydantic import BaseModel
from uuid import UUID


class CommentCreate(BaseModel):
    task_id: UUID
    user_id: UUID
    comment_text: str


class CommentResponse(BaseModel):
    comment_id: UUID
    task_id: UUID
    user_id: UUID
    comment_text: str

    class Config:
        from_attributes = True