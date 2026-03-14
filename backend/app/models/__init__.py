"""
SQLAlchemy ORM models.
Import all models here to ensure they're registered with Base.metadata.
"""
from app.models.user import User
from app.models.project import Project
from app.models.issue import Issue
from app.models.sprint import Sprint
from app.models.milestone import Milestone
from app.models.label import Label
from app.models.comment import Comment
from app.models.activity import Activity
from app.models.notification import Notification
from app.models.time_entry import TimeEntry
from app.models.calendar_event import CalendarEvent
from app.models.associations import (
    project_members,
    issue_assignees,
    issue_labels,
    sprint_issues,
)

__all__ = [
    "User",
    "Project",
    "Issue",
    "Sprint",
    "Milestone",
    "Label",
    "Comment",
    "Activity",
    "Notification",
    "TimeEntry",
    "CalendarEvent",
    "project_members",
    "issue_assignees",
    "issue_labels",
    "sprint_issues",
]
