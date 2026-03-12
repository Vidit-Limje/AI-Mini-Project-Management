from pydantic import BaseModel

class ProjectCreate(BaseModel):
    project_name: str
    domain: str


class ProjectResponse(BaseModel):
    project_id: int
    project_name: str
    domain: str

    class Config:
        from_attributes = True