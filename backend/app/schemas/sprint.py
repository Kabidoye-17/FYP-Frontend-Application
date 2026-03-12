"""
Sprint schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.sprint import SprintStatus
from app.schemas.issue import IssueBrief


class SprintBase(BaseModel):
    """Base sprint schema with common fields."""
    name: str
    goal: Optional[str] = ""
    status: Optional[SprintStatus] = SprintStatus.PLANNING
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    capacity: Optional[int] = 0


class SprintCreate(SprintBase):
    """Schema for creating a sprint."""
    id: Optional[str] = None  # Will be generated if not provided
    issue_ids: Optional[List[str]] = []


class SprintUpdate(BaseModel):
    """Schema for updating a sprint."""
    name: Optional[str] = None
    goal: Optional[str] = None
    status: Optional[SprintStatus] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    capacity: Optional[int] = None
    issue_ids: Optional[List[str]] = None


class SprintResponse(SprintBase):
    """Schema for sprint responses."""
    id: str
    issues: List[IssueBrief] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
