"""
Sprint model - represents time-boxed iterations.
"""
from sqlalchemy import Column, String, Text, DateTime, Integer, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base
from app.models.associations import sprint_issues


class SprintStatus(str, enum.Enum):
    """Sprint status enumeration."""
    PLANNING = "planning"
    ACTIVE = "active"
    COMPLETED = "completed"


class Sprint(Base):
    """Sprint model representing a time-boxed iteration."""
    __tablename__ = "sprints"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    goal = Column(Text, default="")
    status = Column(Enum(SprintStatus), default=SprintStatus.PLANNING)
    start_date = Column(DateTime, nullable=True)
    end_date = Column(DateTime, nullable=True)
    capacity = Column(Integer, default=0)  # Total story points capacity
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    issues = relationship(
        "Issue",
        secondary=sprint_issues,
        back_populates="sprints",
        lazy="selectin"
    )

    def __repr__(self):
        return f"<Sprint {self.name}>"
