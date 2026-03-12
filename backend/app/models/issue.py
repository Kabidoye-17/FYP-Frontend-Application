"""
Issue model - represents tasks/bugs/features.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum, Integer
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base
from app.models.associations import issue_assignees, issue_labels, sprint_issues


class IssueStatus(str, enum.Enum):
    """Issue status enumeration."""
    BACKLOG = "backlog"
    IN_PROGRESS = "in progress"
    COMPLETED = "completed"


class IssuePriority(str, enum.Enum):
    """Issue priority enumeration."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Issue(Base):
    """Issue model representing a task, bug, or feature."""
    __tablename__ = "issues"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text, default="")
    status = Column(Enum(IssueStatus), default=IssueStatus.BACKLOG)
    priority = Column(Enum(IssuePriority), default=IssuePriority.MEDIUM)
    project_id = Column(String, ForeignKey("projects.id", ondelete="SET NULL"), nullable=True)
    milestone_id = Column(String, ForeignKey("milestones.id", ondelete="SET NULL"), nullable=True)
    estimate = Column(Integer, nullable=True)  # Story points or hours
    target_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    project = relationship("Project", back_populates="issues")
    milestone = relationship("Milestone", back_populates="issues")
    assignees = relationship(
        "User",
        secondary=issue_assignees,
        backref="assigned_issues",
        lazy="selectin"
    )
    labels = relationship(
        "Label",
        secondary=issue_labels,
        backref="issues",
        lazy="selectin"
    )
    sprints = relationship(
        "Sprint",
        secondary=sprint_issues,
        back_populates="issues",
        lazy="selectin"
    )
    comments = relationship("Comment", back_populates="issue", cascade="all, delete-orphan")
    time_entries = relationship("TimeEntry", back_populates="issue", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Issue {self.title}>"
