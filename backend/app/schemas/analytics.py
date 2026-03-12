"""
Analytics schemas for API validation.
"""
from pydantic import BaseModel
from typing import List, Dict, Any


class DashboardStats(BaseModel):
    """Dashboard statistics response."""
    total_issues: int
    completed_issues: int
    in_progress_issues: int
    backlog_issues: int
    total_projects: int
    active_sprints: int
    team_members: int
    issues_by_priority: Dict[str, int]
    issues_by_project: List[Dict[str, Any]]
    recent_activities: List[Dict[str, Any]]


class SprintVelocity(BaseModel):
    """Velocity data for a single sprint."""
    sprint_name: str
    planned: int
    completed: int


class VelocityData(BaseModel):
    """Team velocity response."""
    sprints: List[SprintVelocity]
    average_velocity: float


class BurndownPoint(BaseModel):
    """Single point on burndown chart."""
    date: str
    remaining: int
    ideal: float


class BurndownData(BaseModel):
    """Burndown chart response."""
    sprint_name: str
    total_points: int
    points: List[BurndownPoint]
