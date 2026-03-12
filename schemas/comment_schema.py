from pydantic import BaseModel

class CommentCreate(BaseModel):
    task_id: int
    user_id: int
    comment_text: str


class CommentResponse(BaseModel):
    comment_id: int
    task_id: int
    user_id: int
    comment_text: str

    class Config:
        from_attributes = True