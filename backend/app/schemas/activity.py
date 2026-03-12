"""
Activity schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.activity import ActivityType, TargetType


class UserBriefActivity(BaseModel):
    """User info for activity responses."""
    name: str
    color: str


class ActivityBase(BaseModel):
    """Base activity schema with common fields."""
    type: ActivityType
    target_type: TargetType
    target_id: str
    target_title: str
    details: Optional[str] = None


class ActivityCreate(ActivityBase):
    """Schema for creating an activity."""
    id: Optional[str] = None  # Will be generated if not provided
    user_id: str


class ActivityResponse(BaseModel):
    """Schema for activity responses - matches frontend ActivityItem interface."""
    id: str
    type: str  # 'completed', 'commented', etc.
    user: UserBriefActivity
    target: str  # target_title
    target_type: str  # 'issue', 'project', etc.
    details: Optional[str] = None
    timestamp: datetime

    class Config:
        from_attributes = True
