"""
Sprints CRUD endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import uuid
from app.core.dependencies import get_db
from app.models.sprint import Sprint
from app.models.issue import Issue
from app.models.associations import sprint_issues
from app.schemas.sprint import SprintCreate, SprintUpdate, SprintResponse
from app.schemas.issue import IssueBrief

router = APIRouter(prefix="/sprints", tags=["Sprints"])


def sprint_to_response(sprint: Sprint) -> dict:
    """Convert a Sprint model to response dict."""
    issues_brief = [
        {
            "id": i.id,
            "title": i.title,
            "status": i.status.value if i.status else "backlog",
            "priority": i.priority.value if i.priority else "medium"
        }
        for i in sprint.issues
    ]

    return {
        "id": sprint.id,
        "name": sprint.name,
        "goal": sprint.goal,
        "status": sprint.status,
        "start_date": sprint.start_date,
        "end_date": sprint.end_date,
        "capacity": sprint.capacity,
        "issues": issues_brief,
        "created_at": sprint.created_at,
        "updated_at": sprint.updated_at
    }


@router.get("", response_model=List[SprintResponse])
async def list_sprints(
    status: Optional[str] = Query(None, description="Filter by status"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all sprints with optional status filter.
    """
    query = select(Sprint).options(
        selectinload(Sprint.issues)
    ).order_by(Sprint.start_date.desc())

    if status:
        query = query.where(Sprint.status == status)

    result = await db.execute(query)
    sprints = result.scalars().unique().all()

    return [sprint_to_response(s) for s in sprints]


@router.post("", response_model=SprintResponse)
async def create_sprint(
    sprint_data: SprintCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new sprint.
    """
    sprint = Sprint(
        id=sprint_data.id or f"sprint-{uuid.uuid4().hex[:8]}",
        name=sprint_data.name,
        goal=sprint_data.goal,
        status=sprint_data.status,
        start_date=sprint_data.start_date,
        end_date=sprint_data.end_date,
        capacity=sprint_data.capacity
    )
    db.add(sprint)
    await db.flush()

    # Add issues if specified
    if sprint_data.issue_ids:
        for issue_id in sprint_data.issue_ids:
            await db.execute(
                sprint_issues.insert().values(
                    sprint_id=sprint.id,
                    issue_id=issue_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.id == sprint.id)
    )
    sprint = result.scalar_one()

    return sprint_to_response(sprint)


@router.get("/{sprint_id}", response_model=SprintResponse)
async def get_sprint(sprint_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get a specific sprint by ID.
    """
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.id == sprint_id)
    )
    sprint = result.scalar_one_or_none()

    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    return sprint_to_response(sprint)


@router.put("/{sprint_id}", response_model=SprintResponse)
async def update_sprint(
    sprint_id: str,
    sprint_data: SprintUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a sprint.
    """
    result = await db.execute(select(Sprint).where(Sprint.id == sprint_id))
    sprint = result.scalar_one_or_none()

    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    # Update simple fields
    update_data = sprint_data.model_dump(exclude_unset=True, exclude={"issue_ids"})
    for field, value in update_data.items():
        setattr(sprint, field, value)

    # Update issues if specified
    if sprint_data.issue_ids is not None:
        await db.execute(
            sprint_issues.delete().where(sprint_issues.c.sprint_id == sprint_id)
        )
        for issue_id in sprint_data.issue_ids:
            await db.execute(
                sprint_issues.insert().values(
                    sprint_id=sprint_id,
                    issue_id=issue_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.id == sprint_id)
    )
    sprint = result.scalar_one()

    return sprint_to_response(sprint)


@router.delete("/{sprint_id}")
async def delete_sprint(sprint_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete a sprint.
    """
    result = await db.execute(select(Sprint).where(Sprint.id == sprint_id))
    sprint = result.scalar_one_or_none()

    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    await db.delete(sprint)
    await db.commit()
    return {"message": "Sprint deleted successfully"}


@router.get("/{sprint_id}/issues", response_model=List[IssueBrief])
async def get_sprint_issues(sprint_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get all issues in a sprint.
    """
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.id == sprint_id)
    )
    sprint = result.scalar_one_or_none()

    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    return [
        {
            "id": i.id,
            "title": i.title,
            "status": i.status.value if i.status else "backlog",
            "priority": i.priority.value if i.priority else "medium"
        }
        for i in sprint.issues
    ]
