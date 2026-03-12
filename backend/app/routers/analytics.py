"""
Analytics endpoints for dashboard, velocity, and burndown data.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from datetime import datetime, timedelta
from app.core.dependencies import get_db
from app.models.issue import Issue, IssueStatus
from app.models.project import Project
from app.models.sprint import Sprint, SprintStatus
from app.models.user import User
from app.models.activity import Activity
from app.schemas.analytics import DashboardStats, VelocityData, SprintVelocity, BurndownData, BurndownPoint

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(db: AsyncSession = Depends(get_db)):
    """
    Get dashboard statistics including issue counts, project counts, and recent activities.
    """
    # Get issue counts by status
    total_issues = await db.execute(select(func.count(Issue.id)))
    total_issues = total_issues.scalar() or 0

    completed_issues = await db.execute(
        select(func.count(Issue.id)).where(Issue.status == IssueStatus.COMPLETED)
    )
    completed_issues = completed_issues.scalar() or 0

    in_progress_issues = await db.execute(
        select(func.count(Issue.id)).where(Issue.status == IssueStatus.IN_PROGRESS)
    )
    in_progress_issues = in_progress_issues.scalar() or 0

    backlog_issues = await db.execute(
        select(func.count(Issue.id)).where(Issue.status == IssueStatus.BACKLOG)
    )
    backlog_issues = backlog_issues.scalar() or 0

    # Get project count
    total_projects = await db.execute(select(func.count(Project.id)))
    total_projects = total_projects.scalar() or 0

    # Get active sprints count
    active_sprints = await db.execute(
        select(func.count(Sprint.id)).where(Sprint.status == SprintStatus.ACTIVE)
    )
    active_sprints = active_sprints.scalar() or 0

    # Get team member count
    team_members = await db.execute(select(func.count(User.id)))
    team_members = team_members.scalar() or 0

    # Issues by priority
    issues_by_priority = {
        "high": 0,
        "medium": 0,
        "low": 0
    }
    for priority in ["high", "medium", "low"]:
        count = await db.execute(
            select(func.count(Issue.id)).where(Issue.priority == priority)
        )
        issues_by_priority[priority] = count.scalar() or 0

    # Issues by project
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.issues))
    )
    projects = result.scalars().unique().all()
    issues_by_project = [
        {"name": p.name, "count": len(p.issues)}
        for p in projects
    ]

    # Recent activities
    result = await db.execute(
        select(Activity)
        .options(selectinload(Activity.user))
        .order_by(Activity.timestamp.desc())
        .limit(5)
    )
    activities = result.scalars().all()
    recent_activities = [
        {
            "id": a.id,
            "type": a.type.value if a.type else "updated",
            "user": {"name": a.user.name, "color": a.user.color} if a.user else {"name": "Unknown", "color": "#727272"},
            "target": a.target_title,
            "target_type": a.target_type.value if a.target_type else "issue",
            "timestamp": a.timestamp.isoformat()
        }
        for a in activities
    ]

    return DashboardStats(
        total_issues=total_issues,
        completed_issues=completed_issues,
        in_progress_issues=in_progress_issues,
        backlog_issues=backlog_issues,
        total_projects=total_projects,
        active_sprints=active_sprints,
        team_members=team_members,
        issues_by_priority=issues_by_priority,
        issues_by_project=issues_by_project,
        recent_activities=recent_activities
    )


@router.get("/velocity", response_model=VelocityData)
async def get_velocity_data(db: AsyncSession = Depends(get_db)):
    """
    Get team velocity data across sprints.
    """
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.status.in_([SprintStatus.COMPLETED, SprintStatus.ACTIVE]))
        .order_by(Sprint.start_date)
    )
    sprints = result.scalars().unique().all()

    sprint_velocities = []
    total_completed = 0

    for sprint in sprints:
        # Calculate planned points (sum of estimates)
        planned = sum(i.estimate or 0 for i in sprint.issues)

        # Calculate completed points
        completed = sum(
            i.estimate or 0
            for i in sprint.issues
            if i.status == IssueStatus.COMPLETED
        )
        total_completed += completed

        sprint_velocities.append(SprintVelocity(
            sprint_name=sprint.name,
            planned=planned,
            completed=completed
        ))

    # Calculate average velocity
    avg_velocity = total_completed / len(sprints) if sprints else 0

    return VelocityData(
        sprints=sprint_velocities,
        average_velocity=round(avg_velocity, 1)
    )


@router.get("/burndown/{sprint_id}", response_model=BurndownData)
async def get_burndown_data(sprint_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get burndown chart data for a specific sprint.
    """
    result = await db.execute(
        select(Sprint)
        .options(selectinload(Sprint.issues))
        .where(Sprint.id == sprint_id)
    )
    sprint = result.scalar_one_or_none()

    if not sprint:
        raise HTTPException(status_code=404, detail="Sprint not found")

    # Calculate total points
    total_points = sum(i.estimate or 0 for i in sprint.issues)

    if not sprint.start_date or not sprint.end_date:
        # Return empty burndown if dates not set
        return BurndownData(
            sprint_name=sprint.name,
            total_points=total_points,
            points=[]
        )

    # Generate burndown points
    points = []
    current_date = sprint.start_date
    end_date = sprint.end_date
    days_total = (end_date - current_date).days or 1
    daily_burn = total_points / days_total

    day_index = 0
    remaining = total_points

    while current_date <= end_date:
        # Ideal line
        ideal = max(0, total_points - (daily_burn * day_index))

        # Simulated actual remaining (in real app, calculate from completed issues)
        # For demo, we'll simulate a realistic burndown pattern
        if day_index < days_total / 2:
            # First half: slower progress
            actual_remaining = remaining - (daily_burn * 0.7)
        else:
            # Second half: catch up
            actual_remaining = remaining - (daily_burn * 1.3)

        remaining = max(0, actual_remaining)

        points.append(BurndownPoint(
            date=current_date.strftime("%Y-%m-%d"),
            remaining=int(remaining),
            ideal=round(ideal, 1)
        ))

        current_date += timedelta(days=1)
        day_index += 1

    return BurndownData(
        sprint_name=sprint.name,
        total_points=total_points,
        points=points
    )
