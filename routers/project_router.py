from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from models.project import Project
from schemas.project_schema import ProjectCreate

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.post("/")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):

    new_project = Project(
        project_name=project.project_name,
        domain=project.domain
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


@router.get("/")
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@router.put("/{project_id}")
def update_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db)):

    proj = db.query(Project).filter(Project.project_id == project_id).first()

    proj.project_name = project.project_name
    proj.domain = project.domain

    db.commit()
    db.refresh(proj)

    return proj


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):

    proj = db.query(Project).filter(Project.project_id == project_id).first()

    db.delete(proj)
    db.commit()

    return {"message": "Project deleted"}