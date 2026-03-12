"""
Time entry schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date


class TimeEntryBase(BaseModel):
    """Base time entry schema with common fields."""
    description: Optional[str] = ""
    duration: int  # Duration in minutes
    date: Optional[date] = None


class TimeEntryCreate(TimeEntryBase):
    """Schema for creating a time entry."""
    id: Optional[str] = None  # Will be generated if not provided


class TimeEntryResponse(BaseModel):
    """Schema for time entry responses."""
    id: str
    issue_id: str
    user_id: str
    description: str
    duration: int
    date: date
    created_at: datetime

    class Config:
        from_attributes = True
