"""
Junction tables for many-to-many relationships.
These are simple association tables without additional fields.
"""
from sqlalchemy import Table, Column, String, ForeignKey
from app.database import Base

# Project <-> User (team members)
project_members = Table(
    "project_members",
    Base.metadata,
    Column("project_id", String, ForeignKey("projects.id", ondelete="CASCADE"), primary_key=True),
    Column("user_id", String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
)

# Issue <-> User (assignees)
issue_assignees = Table(
    "issue_assignees",
    Base.metadata,
    Column("issue_id", String, ForeignKey("issues.id", ondelete="CASCADE"), primary_key=True),
    Column("user_id", String, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True),
)

# Issue <-> Label
issue_labels = Table(
    "issue_labels",
    Base.metadata,
    Column("issue_id", String, ForeignKey("issues.id", ondelete="CASCADE"), primary_key=True),
    Column("label_id", String, ForeignKey("labels.id", ondelete="CASCADE"), primary_key=True),
)

# Sprint <-> Issue
sprint_issues = Table(
    "sprint_issues",
    Base.metadata,
    Column("sprint_id", String, ForeignKey("sprints.id", ondelete="CASCADE"), primary_key=True),
    Column("issue_id", String, ForeignKey("issues.id", ondelete="CASCADE"), primary_key=True),
)
