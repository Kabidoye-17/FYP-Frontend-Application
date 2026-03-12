"""
Label model - represents issue labels/tags.
"""
from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database import Base


class Label(Base):
    """Label model representing an issue tag."""
    __tablename__ = "labels"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False, unique=True)
    color = Column(String, default="#727272")
    created_at = Column(DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Label {self.name}>"
