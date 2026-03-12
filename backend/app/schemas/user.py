"""
User schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.user import UserRole


class UserBase(BaseModel):
    """Base user schema with common fields."""
    name: str
    color: Optional[str] = "#727272"


class UserCreate(UserBase):
    """Schema for creating a user."""
    id: str
    email: str  # Simple string for demo - no email validation dependency needed
    role: Optional[UserRole] = UserRole.MEMBER


class UserResponse(UserBase):
    """Schema for user responses."""
    id: str
    email: str
    role: UserRole
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class UserBrief(BaseModel):
    """Brief user info for nested responses."""
    id: str
    name: str
    color: str

    class Config:
        from_attributes = True
