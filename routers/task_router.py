from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database.database import get_db
from models.task import Task
from schemas.task_schema import TaskCreate, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/")
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = Task(
        project_id=task.project_id,
        task_title=task.task_title,
        task_description=task.task_description,
        priority=task.priority,
        assignee_id=task.assignee_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task

@router.get("/")
def get_tasks(db: Session = Depends(get_db)):

    tasks = db.query(Task).all()
    return tasks

@router.get("/{task_id}")
def get_task(task_id: str, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task

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

@router.delete("/{task_id}")
def delete_task(task_id: str, db: Session = Depends(get_db)):

    task = db.query(Task).filter(Task.task_id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted successfully"}