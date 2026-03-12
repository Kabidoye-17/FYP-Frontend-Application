"""
Notification schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.notification import NotificationType


class NotificationBase(BaseModel):
    """Base notification schema with common fields."""
    type: NotificationType
    title: str
    description: Optional[str] = None
    is_read: bool = False


class NotificationResponse(BaseModel):
    """Schema for notification responses - matches frontend Notification interface."""
    id: str
    type: str  # 'mention', 'assignment', 'comment', etc.
    title: str
    description: Optional[str] = None
    timestamp: datetime
    is_read: bool

    class Config:
        from_attributes = True
