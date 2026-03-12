"""
Issue schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.issue import IssueStatus, IssuePriority
from app.schemas.user import UserBrief
from app.schemas.label import LabelResponse


class CommentBrief(BaseModel):
    """Brief comment info for issue responses."""
    id: str
    author_id: str
    author_name: str
    author_color: str
    text: str
    created_at: datetime

    class Config:
        from_attributes = True


class IssueBase(BaseModel):
    """Base issue schema with common fields."""
    title: str
    description: Optional[str] = ""
    status: Optional[IssueStatus] = IssueStatus.BACKLOG
    priority: Optional[IssuePriority] = IssuePriority.MEDIUM
    estimate: Optional[int] = None
    target_date: Optional[datetime] = None


class IssueCreate(IssueBase):
    """Schema for creating an issue."""
    id: Optional[str] = None  # Will be generated if not provided
    project_id: Optional[str] = None
    milestone_id: Optional[str] = None
    assignee_ids: Optional[List[str]] = []
    label_ids: Optional[List[str]] = []


class IssueUpdate(BaseModel):
    """Schema for updating an issue."""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[IssueStatus] = None
    priority: Optional[IssuePriority] = None
    project_id: Optional[str] = None
    milestone_id: Optional[str] = None
    assignee_ids: Optional[List[str]] = None
    label_ids: Optional[List[str]] = None
    estimate: Optional[int] = None
    target_date: Optional[datetime] = None


class IssueResponse(IssueBase):
    """Schema for issue responses."""
    id: str
    project_id: Optional[str] = None
    milestone_id: Optional[str] = None
    assignees: List[UserBrief] = []
    labels: List[LabelResponse] = []
    comments: List[CommentBrief] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class IssueBrief(BaseModel):
    """Brief issue info for nested responses."""
    id: str
    title: str
    status: str
    priority: str

    class Config:
        from_attributes = True
