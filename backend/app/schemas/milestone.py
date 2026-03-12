"""
Milestone schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.milestone import MilestoneStatus
from app.schemas.issue import IssueBrief


class MilestoneBase(BaseModel):
    """Base milestone schema with common fields."""
    title: str
    description: Optional[str] = ""
    status: Optional[MilestoneStatus] = MilestoneStatus.OPEN
    due_date: Optional[datetime] = None


class MilestoneCreate(MilestoneBase):
    """Schema for creating a milestone."""
    id: Optional[str] = None  # Will be generated if not provided
    project_id: str


class MilestoneUpdate(BaseModel):
    """Schema for updating a milestone."""
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[MilestoneStatus] = None
    due_date: Optional[datetime] = None


class MilestoneResponse(MilestoneBase):
    """Schema for milestone responses."""
    id: str
    project_id: str
    issues: List[IssueBrief] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
