"""
Project schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.project import ProjectStatus, ProjectPriority
from app.schemas.user import UserBrief
from app.schemas.label import LabelResponse


class ProjectBase(BaseModel):
    """Base project schema with common fields."""
    name: str
    title: str
    description: Optional[str] = ""
    status: Optional[ProjectStatus] = ProjectStatus.BACKLOG
    priority: Optional[ProjectPriority] = ProjectPriority.MEDIUM
    color: Optional[str] = "#3182CE"
    target_date: Optional[datetime] = None


class ProjectCreate(ProjectBase):
    """Schema for creating a project."""
    id: Optional[str] = None  # Will be generated if not provided
    lead_id: Optional[str] = None
    member_ids: Optional[List[str]] = []
    label_ids: Optional[List[str]] = []


class ProjectUpdate(BaseModel):
    """Schema for updating a project."""
    name: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    priority: Optional[ProjectPriority] = None
    color: Optional[str] = None
    lead_id: Optional[str] = None
    member_ids: Optional[List[str]] = None
    label_ids: Optional[List[str]] = None
    target_date: Optional[datetime] = None


class IssueBriefForProject(BaseModel):
    """Brief issue info for project responses."""
    id: str
    title: str
    status: str
    priority: str

    class Config:
        from_attributes = True


class ProjectResponse(ProjectBase):
    """Schema for project responses."""
    id: str
    lead_id: Optional[str] = None
    lead: Optional[UserBrief] = None
    members: List[UserBrief] = []
    member_ids: List[str] = []
    labels: List[LabelResponse] = []
    associated_issues: List[IssueBriefForProject] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProjectBrief(BaseModel):
    """Brief project info for nested responses."""
    id: str
    name: str

    class Config:
        from_attributes = True
