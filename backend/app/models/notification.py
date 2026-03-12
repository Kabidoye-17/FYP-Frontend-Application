"""
Notification model - represents user notifications.
"""
from sqlalchemy import Column, String, Text, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.database import Base


class NotificationType(str, enum.Enum):
    """Notification type enumeration."""
    MENTION = "mention"
    ASSIGNMENT = "assignment"
    COMMENT = "comment"
    STATUS_CHANGE = "status_change"
    DUE_DATE = "due_date"


class Notification(Base):
    """Notification model representing a user notification."""
    __tablename__ = "notifications"

    id = Column(String, primary_key=True)
    type = Column(Enum(NotificationType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_read = Column(Boolean, default=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="notifications")

    def __repr__(self):
        return f"<Notification {self.title}>"
