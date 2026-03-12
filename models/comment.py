from sqlalchemy import Column, Integer, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database.database import Base

class Comment(Base):
    __tablename__ = "comments"

    comment_id = Column(Integer, primary_key=True, index=True)
    task_id = Column(Integer, ForeignKey("tasks.task_id"))
    user_id = Column(Integer, ForeignKey("users.user_id"))
    comment_text = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())