from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import UUID

from database.database import get_db
from models.comment import Comment
from models.task import Task
from schemas.comment_schema import CommentCreate, CommentResponse

router = APIRouter(prefix="/comments", tags=["Comments"])


# CREATE COMMENT
@router.post("/", response_model=CommentResponse)
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):

    # Verify task exists
    task = db.query(Task).filter(Task.task_id == comment.task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    new_comment = Comment(
        task_id=comment.task_id,
        user_id=comment.user_id,
        comment_text=comment.comment_text
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


# GET COMMENTS FOR A TASK
@router.get("/task/{task_id}", response_model=list[CommentResponse])
def get_comments(task_id: UUID, db: Session = Depends(get_db)):

    comments = db.query(Comment).filter(
        Comment.task_id == task_id
    ).order_by(Comment.comment_id.desc()).all()

    return comments


# DELETE COMMENT
@router.delete("/{comment_id}")
def delete_comment(comment_id: UUID, db: Session = Depends(get_db)):

    comment = db.query(Comment).filter(
        Comment.comment_id == comment_id
    ).first()

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")

    db.delete(comment)
    db.commit()

    return {"message": "Comment deleted successfully"}