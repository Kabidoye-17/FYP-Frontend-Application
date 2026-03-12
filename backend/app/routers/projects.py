"""
Projects CRUD endpoints.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import uuid
from app.core.dependencies import get_db
from app.models.project import Project
from app.models.user import User
from app.models.label import Label
from app.models.associations import project_members
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse, ProjectBrief
from app.schemas.user import UserBrief

router = APIRouter(prefix="/projects", tags=["Projects"])


def project_to_response(project: Project) -> dict:
    """Convert a Project model to response dict with computed fields."""
    # Get associated issues brief info
    associated_issues = [
        {
            "id": issue.id,
            "title": issue.title,
            "status": issue.status.value if issue.status else "backlog",
            "priority": issue.priority.value if issue.priority else "medium"
        }
        for issue in project.issues
    ]

    return {
        "id": project.id,
        "name": project.name,
        "title": project.title,
        "description": project.description,
        "status": project.status,
        "priority": project.priority,
        "color": project.color,
        "lead_id": project.lead_id,
        "lead": project.lead,
        "members": project.members,
        "member_ids": [m.id for m in project.members],
        "labels": [],  # Projects don't have labels directly in current schema
        "associated_issues": associated_issues,
        "target_date": project.target_date,
        "created_at": project.created_at,
        "updated_at": project.updated_at
    }


@router.get("", response_model=List[ProjectResponse])
async def list_projects(
    status: Optional[str] = Query(None, description="Filter by status"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all projects with optional status filter.
    """
    query = select(Project).options(
        selectinload(Project.lead),
        selectinload(Project.members),
        selectinload(Project.issues)
    ).order_by(Project.created_at.desc())

    if status:
        query = query.where(Project.status == status)

    result = await db.execute(query)
    projects = result.scalars().unique().all()

    return [project_to_response(p) for p in projects]


@router.post("", response_model=ProjectResponse)
async def create_project(
    project_data: ProjectCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new project.
    """
    project = Project(
        id=project_data.id or f"project-{uuid.uuid4().hex[:8]}",
        name=project_data.name,
        title=project_data.title,
        description=project_data.description,
        status=project_data.status,
        priority=project_data.priority,
        color=project_data.color,
        lead_id=project_data.lead_id,
        target_date=project_data.target_date
    )
    db.add(project)
    await db.flush()

    # Add members if specified
    if project_data.member_ids:
        for user_id in project_data.member_ids:
            await db.execute(
                project_members.insert().values(
                    project_id=project.id,
                    user_id=user_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Project)
        .options(
            selectinload(Project.lead),
            selectinload(Project.members),
            selectinload(Project.issues)
        )
        .where(Project.id == project.id)
    )
    project = result.scalar_one()

    return project_to_response(project)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(project_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get a specific project by ID.
    """
    result = await db.execute(
        select(Project)
        .options(
            selectinload(Project.lead),
            selectinload(Project.members),
            selectinload(Project.issues)
        )
        .where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project_to_response(project)


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update a project.
    """
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.members))
        .where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Update simple fields
    update_data = project_data.model_dump(exclude_unset=True, exclude={"member_ids", "label_ids"})
    for field, value in update_data.items():
        setattr(project, field, value)

    # Update members if specified
    if project_data.member_ids is not None:
        # Remove existing members
        await db.execute(
            project_members.delete().where(project_members.c.project_id == project_id)
        )
        # Add new members
        for user_id in project_data.member_ids:
            await db.execute(
                project_members.insert().values(
                    project_id=project_id,
                    user_id=user_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Project)
        .options(
            selectinload(Project.lead),
            selectinload(Project.members),
            selectinload(Project.issues)
        )
        .where(Project.id == project_id)
    )
    project = result.scalar_one()

    return project_to_response(project)


@router.delete("/{project_id}")
async def delete_project(project_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete a project.
    """
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.delete(project)
    await db.commit()
    return {"message": "Project deleted successfully"}


@router.get("/{project_id}/members", response_model=List[UserBrief])
async def get_project_members(project_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get members of a specific project.
    """
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.members))
        .where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project.members
