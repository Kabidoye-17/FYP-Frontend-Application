"""
Calendar Event schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from app.models.calendar_event import EventType


class CalendarEventBase(BaseModel):
    """Base calendar event schema."""
    title: str
    description: Optional[str] = None
    date: datetime
    type: EventType = EventType.MEETING


class CalendarEventCreate(CalendarEventBase):
    """Schema for creating a calendar event."""
    pass


class CalendarEventUpdate(BaseModel):
    """Schema for updating a calendar event."""
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    type: Optional[EventType] = None


class CalendarEventResponse(CalendarEventBase):
    """Schema for calendar event responses."""
    id: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
