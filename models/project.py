from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.sql import func
from database.database import Base

class Project(Base):
    __tablename__ = "projects"

    project_id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(200), nullable=False)
    domain = Column(String(100))
    created_at = Column(TIMESTAMP, server_default=func.now())