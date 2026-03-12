"""
Milestones CRUD endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import uuid
from app.core.dependencies import get_db
from app.models.milestone import Milestone
from app.models.issue import Issue
from app.schemas.milestone import MilestoneCreate, MilestoneUpdate, MilestoneResponse
from app.schemas.issue import IssueBrief

router = APIRouter(prefix="/milestones", tags=["Milestones"])


def milestone_to_response(milestone: Milestone) -> dict:
    """Convert a Milestone model to response dict."""
    issues_brief = [
        {
            "id": i.id,
            "title": i.title,
            "status": i.status.value if i.status else "backlog",
            "priority": i.priority.value if i.priority else "medium"
        }
        for i in milestone.issues
    ]

    return {
        "id": milestone.id,
        "title": milestone.title,
        "description": milestone.description,
        "status": milestone.status,
        "due_date": milestone.due_date,
        "project_id": milestone.project_id,
        "issues": issues_brief,
        "created_at": milestone.created_at,
        "updated_at": milestone.updated_at
    }


@router.get("", response_model=List[MilestoneResponse])
async def list_milestones(
    project_id: Optional[str] = Query(None, description="Filter by project"),
    status: Optional[str] = Query(None, description="Filter by status"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all milestones with optional filters.
    """
    query = select(Milestone).options(
        selectinload(Milestone.issues)
    ).order_by(Milestone.due_date)

    if project_id:
        query = query.where(Milestone.project_id == project_id)
    if status:
        query = query.where(Milestone.status == status)

    result = await db.execute(query)
    milestones = result.scalars().unique().all()

    return [milestone_to_response(m) for m in milestones]


@router.post("", response_model=MilestoneResponse)
async def create_milestone(
    milestone_data: MilestoneCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new milestone.
    """
    milestone = Milestone(
        id=milestone_data.id or f"milestone-{uuid.uuid4().hex[:8]}",
        title=milestone_data.title,
        description=milestone_data.description,
        status=milestone_data.status,
        due_date=milestone_data.due_date,
        project_id=milestone_data.project_id
    )
    db.add(milestone)
    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Milestone)
        .options(selectinload(Milestone.issues))
        .where(Milestone.id == milestone.id)
    )
    milestone = result.scalar_one()

    return milestone_to_response(milestone)


@router.get("/{milestone_id}", response_model=MilestoneResponse)
async def get_milestone(milestone_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get a specific milestone by ID.
    """
    result = await db.execute(
        select(Milestone)
        .options(selectinload(Milestone.issues))
        .where(Milestone.id == milestone_id)
    )
    milestone = result.scalar_one_or_none()

    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")

    return milestone_to_response(milestone)


@router.put("/{milestone_id}", response_model=MilestoneResponse)
async def update_milestone(
    milestone_id: str,
    milestone_data: MilestoneUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a milestone.
    """
    result = await db.execute(select(Milestone).where(Milestone.id == milestone_id))
    milestone = result.scalar_one_or_none()

    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")

    # Update fields
    update_data = milestone_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(milestone, field, value)

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Milestone)
        .options(selectinload(Milestone.issues))
        .where(Milestone.id == milestone_id)
    )
    milestone = result.scalar_one()

    return milestone_to_response(milestone)


@router.delete("/{milestone_id}")
async def delete_milestone(milestone_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete a milestone.
    """
    result = await db.execute(select(Milestone).where(Milestone.id == milestone_id))
    milestone = result.scalar_one_or_none()

    if not milestone:
        raise HTTPException(status_code=404, detail="Milestone not found")

    await db.delete(milestone)
    await db.commit()
    return {"message": "Milestone deleted successfully"}
