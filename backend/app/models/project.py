"""
Project model - represents work projects.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base
from app.models.associations import project_members


class ProjectStatus(str, enum.Enum):
    """Project status enumeration."""
    BACKLOG = "backlog"
    IN_PROGRESS = "in progress"
    COMPLETED = "completed"


class ProjectPriority(str, enum.Enum):
    """Project priority enumeration."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Project(Base):
    """Project model representing a work project."""
    __tablename__ = "projects"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)  # For backward compat with simple frontend
    title = Column(String, nullable=False)  # Full title
    description = Column(Text, default="")
    status = Column(Enum(ProjectStatus), default=ProjectStatus.BACKLOG)
    priority = Column(Enum(ProjectPriority), default=ProjectPriority.MEDIUM)
    color = Column(String, default="#3182CE")
    lead_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    target_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    lead = relationship("User", back_populates="led_projects", foreign_keys=[lead_id])
    members = relationship(
        "User",
        secondary=project_members,
        backref="projects",
        lazy="selectin"
    )
    issues = relationship("Issue", back_populates="project", cascade="all, delete-orphan")
    milestones = relationship("Milestone", back_populates="project", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Project {self.name}>"
