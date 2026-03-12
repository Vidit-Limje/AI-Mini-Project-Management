from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.comment import Comment
from schemas.comment_schema import CommentCreate

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.post("/")
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):

    new_comment = Comment(
        task_id=comment.task_id,
        user_id=comment.user_id,
        comment_text=comment.comment_text
    )

    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)

    return new_comment


@router.get("/task/{task_id}")
def get_comments(task_id: int, db: Session = Depends(get_db)):

    return db.query(Comment).filter(Comment.task_id == task_id).all()


@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db)):

    comment = db.query(Comment).filter(Comment.comment_id == comment_id).first()

    db.delete(comment)
    db.commit()

    return {"message": "Comment deleted"}