from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.auth.role_checker import admin_required

from app.database import database
from app.schemas.task_schema import (
    TaskCreate,
    TaskUpdate
)
from app.auth.jwt_bearer import verify_token

router = APIRouter()

tasks_collection = database.tasks


@router.post("/")
async def create_task(
    task: TaskCreate,
    user=Depends(verify_token)
):

    task_data = {
        "title": task.title,
        "description": task.description,
        "completed": False,
        "owner_email": user["email"]
    }

    result = await tasks_collection.insert_one(task_data)

    return {
        "message": "Task created",
        "task_id": str(result.inserted_id)
    }


@router.get("/")
async def get_tasks(
    user=Depends(verify_token)
):

    tasks = []

    async for task in tasks_collection.find(
        {"owner_email": user["email"]}
    ):

        task["_id"] = str(task["_id"])

        tasks.append(task)

    return tasks


@router.put("/{task_id}")
async def update_task(
    task_id: str,
    updated_task: TaskUpdate,
    user=Depends(verify_token)
):

    existing_task = await tasks_collection.find_one(
        {
            "_id": ObjectId(task_id)
        }
    )

    if not existing_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    # Allow ONLY:
    # 1. Task owner
    # 2. Admin

    if (
        existing_task["owner_email"] != user["email"]
        and user["role"] != "admin"
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    await tasks_collection.update_one(
        {"_id": ObjectId(task_id)},
        {
            "$set": {
                "title": updated_task.title,
                "description": updated_task.description
            }
        }
    )

    return {
        "message": "Task updated successfully"
    }
@router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    user=Depends(verify_token)
):

    existing_task = await tasks_collection.find_one(
        {
            "_id": ObjectId(task_id)
        }
    )

    if not existing_task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    # Allow ONLY:
    # 1. Task owner
    # 2. Admin

    if (
        existing_task["owner_email"] != user["email"]
        and user["role"] != "admin"
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    await tasks_collection.delete_one(
        {"_id": ObjectId(task_id)}
    )

    return {
        "message": "Task deleted successfully"
    }

@router.get("/admin/all-tasks")
async def get_all_tasks(
    user=Depends(verify_token)
):

    admin_required(user)

    tasks = []

    async for task in tasks_collection.find():

        task["_id"] = str(task["_id"])

        tasks.append(task)

    return tasks