"""
Comment schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CommentBase(BaseModel):
    """Base comment schema with common fields."""
    content: str


class CommentCreate(CommentBase):
    """Schema for creating a comment."""
    id: Optional[str] = None  # Will be generated if not provided


class CommentResponse(BaseModel):
    """Schema for comment responses - matches frontend Comment interface."""
    id: str
    author_id: str
    author_name: str
    author_color: str
    text: str  # Maps to content in DB
    created_at: datetime

    class Config:
        from_attributes = True
