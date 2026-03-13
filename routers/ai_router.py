from fastapi import APIRouter
from schemas.ai_schema import TaskRequest, TaskResponse
from services.ai_service import generate_task_details

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/generate-task", response_model=TaskResponse)
def generate_task(data: TaskRequest):

    result = generate_task_details(
        data.project_name,
        data.domain,
        data.task_title
    )

    return result