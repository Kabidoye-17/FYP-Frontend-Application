"""
Milestone model - represents project milestones/releases.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class MilestoneStatus(str, enum.Enum):
    """Milestone status enumeration."""
    OPEN = "open"
    CLOSED = "closed"


class Milestone(Base):
    """Milestone model representing a project milestone or release."""
    __tablename__ = "milestones"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    status = Column(Enum(MilestoneStatus), default=MilestoneStatus.OPEN)
    due_date = Column(DateTime, nullable=True)
    project_id = Column(String, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="milestones")
    issues = relationship("Issue", back_populates="milestone")

    def __repr__(self):
        return f"<Milestone {self.title}>"
