"""
FastAPI application entry point.
Configures the app, middleware, and routes.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import init_db, close_db, async_session_maker
from app.seeds.seed_data import seed_database
from app.routers import (
    auth_router,
    team_router,
    labels_router,
    projects_router,
    issues_router,
    sprints_router,
    milestones_router,
    analytics_router,
    notifications_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan handler.
    Initializes database on startup, closes on shutdown.
    """
    # Startup: Initialize database and seed data
    print("Starting up...")

    # Import models to register them with Base.metadata
    from app.models import (
        User, Project, Issue, Sprint, Milestone, Label,
        Comment, Activity, Notification, TimeEntry
    )

    await init_db()

    # Seed database with initial data
    async with async_session_maker() as session:
        await seed_database(session)

    print("Database initialized and seeded!")

    yield

    # Shutdown: Close database connection
    print("Shutting down...")
    await close_db()


# Create FastAPI application
app = FastAPI(
    title="FYP Backend API",
    description="Backend API for the FYP Project Management Application",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check endpoint
@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "message": "FYP Backend is running!"}


# Include routers with /api prefix
app.include_router(auth_router, prefix="/api")
app.include_router(team_router, prefix="/api")
app.include_router(labels_router, prefix="/api")
app.include_router(projects_router, prefix="/api")
app.include_router(issues_router, prefix="/api")
app.include_router(sprints_router, prefix="/api")
app.include_router(milestones_router, prefix="/api")
app.include_router(analytics_router, prefix="/api")
app.include_router(notifications_router, prefix="/api")


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": "FYP Backend API",
        "version": "1.0.0",
        "docs": "/api/docs",
        "health": "/api/health"
    }
