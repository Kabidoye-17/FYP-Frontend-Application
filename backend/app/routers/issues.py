"""
Issues CRUD endpoints with filtering support.
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import uuid
from datetime import datetime, date
from app.core.dependencies import get_db, get_current_user_id
from app.models.issue import Issue
from app.models.user import User
from app.models.label import Label
from app.models.comment import Comment
from app.models.time_entry import TimeEntry
from app.models.associations import issue_assignees, issue_labels
from app.schemas.issue import IssueCreate, IssueUpdate, IssueResponse
from app.schemas.comment import CommentCreate, CommentResponse
from app.schemas.time_entry import TimeEntryCreate, TimeEntryResponse

router = APIRouter(prefix="/issues", tags=["Issues"])


def issue_to_response(issue: Issue) -> dict:
    """Convert an Issue model to response dict with computed fields."""
    comments_response = [
        {
            "id": c.id,
            "author_id": c.author_id,
            "author_name": c.author.name if c.author else "Unknown",
            "author_color": c.author.color if c.author else "#727272",
            "text": c.content,
            "created_at": c.created_at
        }
        for c in issue.comments
    ]

    return {
        "id": issue.id,
        "title": issue.title,
        "description": issue.description,
        "status": issue.status,
        "priority": issue.priority,
        "project_id": issue.project_id,
        "milestone_id": issue.milestone_id,
        "estimate": issue.estimate,
        "target_date": issue.target_date,
        "assignees": issue.assignees,
        "labels": issue.labels,
        "comments": comments_response,
        "created_at": issue.created_at,
        "updated_at": issue.updated_at
    }


@router.get("", response_model=List[IssueResponse])
async def list_issues(
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    project_id: Optional[str] = Query(None, description="Filter by project"),
    assignee_id: Optional[str] = Query(None, description="Filter by assignee"),
    label_id: Optional[str] = Query(None, description="Filter by label"),
    db: AsyncSession = Depends(get_db)
):
    """
    Get all issues with optional filters.
    """
    query = select(Issue).options(
        selectinload(Issue.assignees),
        selectinload(Issue.labels),
        selectinload(Issue.comments).selectinload(Comment.author)
    ).order_by(Issue.created_at.desc())

    # Apply filters
    if status:
        query = query.where(Issue.status == status)
    if priority:
        query = query.where(Issue.priority == priority)
    if project_id:
        query = query.where(Issue.project_id == project_id)
    if assignee_id:
        query = query.join(issue_assignees).where(issue_assignees.c.user_id == assignee_id)
    if label_id:
        query = query.join(issue_labels).where(issue_labels.c.label_id == label_id)

    result = await db.execute(query)
    issues = result.scalars().unique().all()

    return [issue_to_response(i) for i in issues]


@router.post("", response_model=IssueResponse)
async def create_issue(
    issue_data: IssueCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new issue.
    """
    issue = Issue(
        id=issue_data.id or f"issue-{uuid.uuid4().hex[:8]}",
        title=issue_data.title,
        description=issue_data.description,
        status=issue_data.status,
        priority=issue_data.priority,
        project_id=issue_data.project_id,
        milestone_id=issue_data.milestone_id,
        estimate=issue_data.estimate,
        target_date=issue_data.target_date
    )
    db.add(issue)
    await db.flush()

    # Add assignees
    if issue_data.assignee_ids:
        for user_id in issue_data.assignee_ids:
            await db.execute(
                issue_assignees.insert().values(
                    issue_id=issue.id,
                    user_id=user_id
                )
            )

    # Add labels
    if issue_data.label_ids:
        for label_id in issue_data.label_ids:
            await db.execute(
                issue_labels.insert().values(
                    issue_id=issue.id,
                    label_id=label_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Issue)
        .options(
            selectinload(Issue.assignees),
            selectinload(Issue.labels),
            selectinload(Issue.comments).selectinload(Comment.author)
        )
        .where(Issue.id == issue.id)
    )
    issue = result.scalar_one()

    return issue_to_response(issue)


@router.get("/{issue_id}", response_model=IssueResponse)
async def get_issue(issue_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get a specific issue by ID.
    """
    result = await db.execute(
        select(Issue)
        .options(
            selectinload(Issue.assignees),
            selectinload(Issue.labels),
            selectinload(Issue.comments).selectinload(Comment.author)
        )
        .where(Issue.id == issue_id)
    )
    issue = result.scalar_one_or_none()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    return issue_to_response(issue)


@router.put("/{issue_id}", response_model=IssueResponse)
async def update_issue(
    issue_id: str,
    issue_data: IssueUpdate,
    db: AsyncSession = Depends(get_db)
):
    """
    Update an issue.
    """
    result = await db.execute(select(Issue).where(Issue.id == issue_id))
    issue = result.scalar_one_or_none()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    # Update simple fields
    update_data = issue_data.model_dump(exclude_unset=True, exclude={"assignee_ids", "label_ids"})
    for field, value in update_data.items():
        setattr(issue, field, value)

    # Update assignees if specified
    if issue_data.assignee_ids is not None:
        await db.execute(
            issue_assignees.delete().where(issue_assignees.c.issue_id == issue_id)
        )
        for user_id in issue_data.assignee_ids:
            await db.execute(
                issue_assignees.insert().values(
                    issue_id=issue_id,
                    user_id=user_id
                )
            )

    # Update labels if specified
    if issue_data.label_ids is not None:
        await db.execute(
            issue_labels.delete().where(issue_labels.c.issue_id == issue_id)
        )
        for label_id in issue_data.label_ids:
            await db.execute(
                issue_labels.insert().values(
                    issue_id=issue_id,
                    label_id=label_id
                )
            )

    await db.commit()

    # Reload with relationships
    result = await db.execute(
        select(Issue)
        .options(
            selectinload(Issue.assignees),
            selectinload(Issue.labels),
            selectinload(Issue.comments).selectinload(Comment.author)
        )
        .where(Issue.id == issue_id)
    )
    issue = result.scalar_one()

    return issue_to_response(issue)


@router.delete("/{issue_id}")
async def delete_issue(issue_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete an issue.
    """
    result = await db.execute(select(Issue).where(Issue.id == issue_id))
    issue = result.scalar_one_or_none()

    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")

    await db.delete(issue)
    await db.commit()
    return {"message": "Issue deleted successfully"}


# ========================
# COMMENTS ENDPOINTS
# ========================

@router.get("/{issue_id}/comments", response_model=List[CommentResponse])
async def get_issue_comments(issue_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get all comments for an issue.
    """
    result = await db.execute(
        select(Comment)
        .options(selectinload(Comment.author))
        .where(Comment.issue_id == issue_id)
        .order_by(Comment.created_at)
    )
    comments = result.scalars().all()

    return [
        {
            "id": c.id,
            "author_id": c.author_id,
            "author_name": c.author.name if c.author else "Unknown",
            "author_color": c.author.color if c.author else "#727272",
            "text": c.content,
            "created_at": c.created_at
        }
        for c in comments
    ]


@router.post("/{issue_id}/comments", response_model=CommentResponse)
async def create_comment(
    issue_id: str,
    comment_data: CommentCreate,
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Add a comment to an issue.
    """
    # Verify issue exists
    result = await db.execute(select(Issue).where(Issue.id == issue_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Issue not found")

    comment = Comment(
        id=comment_data.id or f"comment-{uuid.uuid4().hex[:8]}",
        content=comment_data.content,
        issue_id=issue_id,
        author_id=current_user_id
    )
    db.add(comment)
    await db.commit()

    # Reload with author
    result = await db.execute(
        select(Comment)
        .options(selectinload(Comment.author))
        .where(Comment.id == comment.id)
    )
    comment = result.scalar_one()

    return {
        "id": comment.id,
        "author_id": comment.author_id,
        "author_name": comment.author.name if comment.author else "Unknown",
        "author_color": comment.author.color if comment.author else "#727272",
        "text": comment.content,
        "created_at": comment.created_at
    }


# ========================
# TIME TRACKING ENDPOINTS
# ========================

@router.get("/{issue_id}/time", response_model=List[TimeEntryResponse])
async def get_time_entries(issue_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get all time entries for an issue.
    """
    result = await db.execute(
        select(TimeEntry)
        .where(TimeEntry.issue_id == issue_id)
        .order_by(TimeEntry.date.desc())
    )
    entries = result.scalars().all()
    return entries


@router.post("/{issue_id}/time", response_model=TimeEntryResponse)
async def log_time(
    issue_id: str,
    entry_data: TimeEntryCreate,
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Log time on an issue.
    """
    # Verify issue exists
    result = await db.execute(select(Issue).where(Issue.id == issue_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Issue not found")

    entry = TimeEntry(
        id=entry_data.id or f"time-{uuid.uuid4().hex[:8]}",
        issue_id=issue_id,
        user_id=current_user_id,
        description=entry_data.description,
        duration=entry_data.duration,
        date=entry_data.date or date.today()
    )
    db.add(entry)
    await db.commit()
    await db.refresh(entry)

    return entry
