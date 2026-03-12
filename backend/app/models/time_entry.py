"""
TimeEntry model - represents time tracking entries.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Integer, Date
from sqlalchemy.orm import relationship
from datetime import datetime, date
from app.database import Base


class TimeEntry(Base):
    """TimeEntry model representing a time tracking entry."""
    __tablename__ = "time_entries"

    id = Column(String, primary_key=True)
    issue_id = Column(String, ForeignKey("issues.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    description = Column(Text, default="")
    duration = Column(Integer, nullable=False)  # Duration in minutes
    date = Column(Date, default=date.today)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    issue = relationship("Issue", back_populates="time_entries")
    user = relationship("User", back_populates="time_entries")

    def __repr__(self):
        return f"<TimeEntry {self.duration}min on {self.date}>"
