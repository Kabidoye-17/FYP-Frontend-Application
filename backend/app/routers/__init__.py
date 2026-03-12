"""
API routers module.
"""
from app.routers.auth import router as auth_router
from app.routers.team import router as team_router
from app.routers.labels import router as labels_router
from app.routers.projects import router as projects_router
from app.routers.issues import router as issues_router
from app.routers.sprints import router as sprints_router
from app.routers.milestones import router as milestones_router
from app.routers.analytics import router as analytics_router
from app.routers.notifications import router as notifications_router

__all__ = [
    "auth_router",
    "team_router",
    "labels_router",
    "projects_router",
    "issues_router",
    "sprints_router",
    "milestones_router",
    "analytics_router",
    "notifications_router",
]
