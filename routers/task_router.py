from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from database.database import get_db
from models.task import Task
from models.project import Project
from schemas.task_schema import TaskCreate, TaskUpdate
from services.ai_service import generate_task_details

router = APIRouter(prefix="/tasks", tags=["Tasks"])


# CREATE TASK
@router.post("/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    project = db.query(Project).filter(
        Project.project_id == task.project_id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Default values
    description = task.task_description
    priority = task.priority or "MEDIUM"

    # Use AI if requested
    if task.use_ai:
        ai_result = generate_task_details(
            project.project_name,
            project.domain,
            task.task_title
        )

        description = ai_result["description"]
        priority = ai_result["priority"]

    new_task = Task(
        project_id=task.project_id,
        task_title=task.task_title,
        task_description=description,
        priority=priority,
        assignee_id=task.assignee_id,
        status="TODO"
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# GET ALL TASKS
@router.get("/")
def get_tasks(
    status: Optional[str] = Query(None),
    priority: Optional[str] = Query(None),
    assignee_id: Optional[UUID] = Query(None),
    search: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(Task)

    if status:
        query = query.filter(Task.status == status)

    if priority:
        query = query.filter(Task.priority == priority)

    if assignee_id:
        query = query.filter(Task.assignee_id == assignee_id)

    if search:
        query = query.filter(Task.task_title.ilike(f"%{search}%"))

    tasks = query.all()

    return tasks


# GET SINGLE TASK
@router.get("/{task_id}")
def get_task(task_id: str, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


# UPDATE TASK
@router.put("/{task_id}")
def update_task(task_id: str, task_update: TaskUpdate, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    for key, value in task_update.dict(exclude_unset=True).items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task


# DELETE TASK
@router.delete("/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}