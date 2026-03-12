"""
Label schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class LabelBase(BaseModel):
    """Base label schema with common fields."""
    name: str
    color: Optional[str] = "#727272"


class LabelCreate(LabelBase):
    """Schema for creating a label."""
    id: Optional[str] = None  # Will be generated if not provided


class LabelResponse(LabelBase):
    """Schema for label responses."""
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
