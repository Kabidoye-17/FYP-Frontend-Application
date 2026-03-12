"""
Activity model - represents activity log entries.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class ActivityType(str, enum.Enum):
    """Activity type enumeration."""
    CREATED = "created"
    UPDATED = "updated"
    COMPLETED = "completed"
    COMMENTED = "commented"
    ASSIGNED = "assigned"
    MENTIONED = "mentioned"


class TargetType(str, enum.Enum):
    """Target type for activities."""
    ISSUE = "issue"
    PROJECT = "project"
    SPRINT = "sprint"
    MILESTONE = "milestone"


class Activity(Base):
    """Activity model representing an activity log entry."""
    __tablename__ = "activities"

    id = Column(String, primary_key=True)
    type = Column(Enum(ActivityType), nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    target_type = Column(Enum(TargetType), nullable=False)
    target_id = Column(String, nullable=False)
    target_title = Column(String, nullable=False)  # Denormalized for display
    details = Column(Text, nullable=True)  # Optional details
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="activities")

    def __repr__(self):
        return f"<Activity {self.type} by {self.user_id}>"
