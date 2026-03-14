"""
Calendar Event model - represents events on the calendar.
"""
from sqlalchemy import Column, String, DateTime, Enum, Text
from datetime import datetime
import enum
from app.database import Base


class EventType(str, enum.Enum):
    """Event type enumeration."""
    ISSUE = "issue"
    MILESTONE = "milestone"
    SPRINT = "sprint"
    MEETING = "meeting"


class CalendarEvent(Base):
    """Calendar event model."""
    __tablename__ = "calendar_events"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    date = Column(DateTime, nullable=False)
    type = Column(Enum(EventType), default=EventType.MEETING)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __repr__(self):
        return f"<CalendarEvent {self.title}>"
