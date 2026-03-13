from pydantic import BaseModel

class TaskRequest(BaseModel):
    project_name: str
    domain: str
    task_title: str


class TaskResponse(BaseModel):
    description: str
    priority: str