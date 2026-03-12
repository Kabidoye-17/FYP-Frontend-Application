"""
Seed data for initial database population.
Transfers mock data from frontend to create a realistic demo environment.
"""
from datetime import datetime, timedelta, date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models import (
    User, Project, Issue, Sprint, Milestone, Label,
    Comment, Activity, Notification, TimeEntry,
    project_members, issue_assignees, issue_labels, sprint_issues,
)
from app.models.user import UserRole
from app.models.project import ProjectStatus, ProjectPriority
from app.models.issue import IssueStatus, IssuePriority
from app.models.sprint import SprintStatus
from app.models.milestone import MilestoneStatus
from app.models.activity import ActivityType, TargetType
from app.models.notification import NotificationType


async def seed_database(session: AsyncSession) -> None:
    """Seed the database with initial data."""

    # Check if already seeded
    result = await session.execute(select(User))
    if result.scalars().first():
        print("Database already seeded, skipping...")
        return

    print("Seeding database...")

    # ========================
    # USERS (from assigneeData.ts)
    # ========================
    users = [
        User(
            id="1",
            email="alice@example.com",
            name="Alice Johnson",
            color="#B24F9F",
            role=UserRole.ADMIN
        ),
        User(
            id="2",
            email="bob@example.com",
            name="Bob Smith",
            color="#6945CA",
            role=UserRole.MEMBER
        ),
        User(
            id="3",
            email="carol@example.com",
            name="Carol Williams",
            color="#E3C18A",
            role=UserRole.MEMBER
        ),
        User(
            id="4",
            email="david@example.com",
            name="David Brown",
            color="#D47EC3",
            role=UserRole.MEMBER
        ),
        User(
            id="5",
            email="emma@example.com",
            name="Emma Davis",
            color="#727272",
            role=UserRole.VIEWER
        ),
    ]
    session.add_all(users)

    # ========================
    # LABELS (from labelData.ts)
    # ========================
    labels = [
        Label(id="label-1", name="Bug", color="#E53E3E"),
        Label(id="label-2", name="Feature", color="#38A169"),
        Label(id="label-3", name="Enhancement", color="#3182CE"),
        Label(id="label-4", name="Documentation", color="#805AD5"),
        Label(id="label-5", name="Design", color="#D47EC3"),
    ]
    session.add_all(labels)

    # ========================
    # PROJECTS (from projectData.ts + expanded)
    # ========================
    now = datetime.utcnow()
    projects = [
        Project(
            id="1",
            name="Frontend Redesign",
            title="Frontend Redesign",
            description="Complete redesign of the user interface with modern UI/UX patterns.",
            status=ProjectStatus.IN_PROGRESS,
            priority=ProjectPriority.HIGH,
            color="#B24F9F",
            lead_id="1",
            target_date=now + timedelta(days=60)
        ),
        Project(
            id="2",
            name="API Development",
            title="API Development",
            description="Build RESTful API endpoints for all core features.",
            status=ProjectStatus.IN_PROGRESS,
            priority=ProjectPriority.HIGH,
            color="#6945CA",
            lead_id="2",
            target_date=now + timedelta(days=45)
        ),
        Project(
            id="3",
            name="Mobile App",
            title="Mobile App",
            description="Cross-platform mobile application using React Native.",
            status=ProjectStatus.BACKLOG,
            priority=ProjectPriority.MEDIUM,
            color="#38A169",
            lead_id="3",
            target_date=now + timedelta(days=90)
        ),
        Project(
            id="4",
            name="Database Migration",
            title="Database Migration",
            description="Migrate from legacy database to PostgreSQL.",
            status=ProjectStatus.COMPLETED,
            priority=ProjectPriority.HIGH,
            color="#D69E2E",
            lead_id="4",
            target_date=now - timedelta(days=10)
        ),
        Project(
            id="5",
            name="Testing Framework",
            title="Testing Framework",
            description="Implement comprehensive testing infrastructure.",
            status=ProjectStatus.BACKLOG,
            priority=ProjectPriority.LOW,
            color="#3182CE",
            lead_id="1",
            target_date=now + timedelta(days=120)
        ),
    ]
    session.add_all(projects)
    await session.flush()

    # Add project members
    await session.execute(
        project_members.insert().values([
            {"project_id": "1", "user_id": "1"},
            {"project_id": "1", "user_id": "2"},
            {"project_id": "1", "user_id": "3"},
            {"project_id": "2", "user_id": "2"},
            {"project_id": "2", "user_id": "4"},
            {"project_id": "3", "user_id": "3"},
            {"project_id": "3", "user_id": "5"},
            {"project_id": "4", "user_id": "4"},
            {"project_id": "4", "user_id": "1"},
            {"project_id": "5", "user_id": "1"},
            {"project_id": "5", "user_id": "5"},
        ])
    )

    # ========================
    # SPRINTS
    # ========================
    sprints = [
        Sprint(
            id="sprint-1",
            name="Sprint 1 - Foundation",
            goal="Set up project infrastructure and core components",
            status=SprintStatus.COMPLETED,
            start_date=now - timedelta(days=28),
            end_date=now - timedelta(days=14),
            capacity=40
        ),
        Sprint(
            id="sprint-2",
            name="Sprint 2 - Core Features",
            goal="Implement main user-facing features",
            status=SprintStatus.ACTIVE,
            start_date=now - timedelta(days=14),
            end_date=now + timedelta(days=1),
            capacity=35
        ),
        Sprint(
            id="sprint-3",
            name="Sprint 3 - Polish",
            goal="Bug fixes and performance improvements",
            status=SprintStatus.PLANNING,
            start_date=now + timedelta(days=1),
            end_date=now + timedelta(days=15),
            capacity=30
        ),
    ]
    session.add_all(sprints)

    # ========================
    # MILESTONES
    # ========================
    milestones = [
        Milestone(
            id="milestone-1",
            title="MVP Release",
            description="First release with core functionality",
            status=MilestoneStatus.OPEN,
            due_date=now + timedelta(days=30),
            project_id="1"
        ),
        Milestone(
            id="milestone-2",
            title="API v1.0",
            description="Stable API for external integrations",
            status=MilestoneStatus.OPEN,
            due_date=now + timedelta(days=20),
            project_id="2"
        ),
        Milestone(
            id="milestone-3",
            title="Beta Launch",
            description="Public beta testing phase",
            status=MilestoneStatus.OPEN,
            due_date=now + timedelta(days=60),
            project_id="1"
        ),
        Milestone(
            id="milestone-4",
            title="Mobile Beta",
            description="iOS and Android beta releases",
            status=MilestoneStatus.OPEN,
            due_date=now + timedelta(days=75),
            project_id="3"
        ),
    ]
    session.add_all(milestones)

    # ========================
    # ISSUES
    # ========================
    issues = [
        # Frontend Redesign issues
        Issue(
            id="issue-1",
            title="Implement OAuth2 login flow",
            description="Add Google and GitHub OAuth2 authentication options to the login page.",
            status=IssueStatus.COMPLETED,
            priority=IssuePriority.HIGH,
            project_id="1",
            milestone_id="milestone-1",
            estimate=8,
            target_date=now - timedelta(days=5)
        ),
        Issue(
            id="issue-2",
            title="Dashboard performance optimization",
            description="Optimize dashboard loading time and reduce bundle size.",
            status=IssueStatus.IN_PROGRESS,
            priority=IssuePriority.HIGH,
            project_id="1",
            milestone_id="milestone-1",
            estimate=5,
            target_date=now + timedelta(days=3)
        ),
        Issue(
            id="issue-3",
            title="Fix login redirect bug",
            description="Users are not properly redirected after successful login on mobile browsers.",
            status=IssueStatus.IN_PROGRESS,
            priority=IssuePriority.HIGH,
            project_id="1",
            estimate=3,
            target_date=now + timedelta(days=1)
        ),
        Issue(
            id="issue-4",
            title="Add dark mode support",
            description="Implement system-aware dark mode theme switching.",
            status=IssueStatus.BACKLOG,
            priority=IssuePriority.MEDIUM,
            project_id="1",
            milestone_id="milestone-3",
            estimate=5,
            target_date=now + timedelta(days=14)
        ),
        # API Development issues
        Issue(
            id="issue-5",
            title="Design REST API schema",
            description="Create OpenAPI specification for all endpoints.",
            status=IssueStatus.COMPLETED,
            priority=IssuePriority.HIGH,
            project_id="2",
            milestone_id="milestone-2",
            estimate=5,
            target_date=now - timedelta(days=10)
        ),
        Issue(
            id="issue-6",
            title="Implement user authentication endpoints",
            description="Build login, logout, and refresh token endpoints.",
            status=IssueStatus.COMPLETED,
            priority=IssuePriority.HIGH,
            project_id="2",
            milestone_id="milestone-2",
            estimate=8,
            target_date=now - timedelta(days=3)
        ),
        Issue(
            id="issue-7",
            title="Add rate limiting",
            description="Implement API rate limiting to prevent abuse.",
            status=IssueStatus.BACKLOG,
            priority=IssuePriority.MEDIUM,
            project_id="2",
            estimate=3,
            target_date=now + timedelta(days=7)
        ),
        # Mobile App issues
        Issue(
            id="issue-8",
            title="Set up React Native project",
            description="Initialize RN project with TypeScript and navigation.",
            status=IssueStatus.BACKLOG,
            priority=IssuePriority.MEDIUM,
            project_id="3",
            estimate=3,
            target_date=now + timedelta(days=21)
        ),
        Issue(
            id="issue-9",
            title="Design mobile UI mockups",
            description="Create Figma designs for all mobile screens.",
            status=IssueStatus.IN_PROGRESS,
            priority=IssuePriority.MEDIUM,
            project_id="3",
            milestone_id="milestone-4",
            estimate=8,
            target_date=now + timedelta(days=10)
        ),
        # Testing Framework issues
        Issue(
            id="issue-10",
            title="Set up Jest configuration",
            description="Configure Jest for unit and integration tests.",
            status=IssueStatus.BACKLOG,
            priority=IssuePriority.LOW,
            project_id="5",
            estimate=2,
            target_date=now + timedelta(days=30)
        ),
    ]
    session.add_all(issues)
    await session.flush()

    # Add issue assignees
    await session.execute(
        issue_assignees.insert().values([
            {"issue_id": "issue-1", "user_id": "1"},
            {"issue_id": "issue-1", "user_id": "2"},
            {"issue_id": "issue-2", "user_id": "2"},
            {"issue_id": "issue-3", "user_id": "1"},
            {"issue_id": "issue-4", "user_id": "3"},
            {"issue_id": "issue-5", "user_id": "2"},
            {"issue_id": "issue-6", "user_id": "2"},
            {"issue_id": "issue-6", "user_id": "4"},
            {"issue_id": "issue-7", "user_id": "4"},
            {"issue_id": "issue-8", "user_id": "3"},
            {"issue_id": "issue-9", "user_id": "3"},
            {"issue_id": "issue-9", "user_id": "5"},
            {"issue_id": "issue-10", "user_id": "1"},
        ])
    )

    # Add issue labels
    await session.execute(
        issue_labels.insert().values([
            {"issue_id": "issue-1", "label_id": "label-2"},  # Feature
            {"issue_id": "issue-2", "label_id": "label-3"},  # Enhancement
            {"issue_id": "issue-3", "label_id": "label-1"},  # Bug
            {"issue_id": "issue-4", "label_id": "label-2"},  # Feature
            {"issue_id": "issue-4", "label_id": "label-5"},  # Design
            {"issue_id": "issue-5", "label_id": "label-4"},  # Documentation
            {"issue_id": "issue-6", "label_id": "label-2"},  # Feature
            {"issue_id": "issue-7", "label_id": "label-3"},  # Enhancement
            {"issue_id": "issue-8", "label_id": "label-2"},  # Feature
            {"issue_id": "issue-9", "label_id": "label-5"},  # Design
            {"issue_id": "issue-10", "label_id": "label-4"}, # Documentation
        ])
    )

    # Add sprint issues
    await session.execute(
        sprint_issues.insert().values([
            {"sprint_id": "sprint-1", "issue_id": "issue-1"},
            {"sprint_id": "sprint-1", "issue_id": "issue-5"},
            {"sprint_id": "sprint-1", "issue_id": "issue-6"},
            {"sprint_id": "sprint-2", "issue_id": "issue-2"},
            {"sprint_id": "sprint-2", "issue_id": "issue-3"},
            {"sprint_id": "sprint-2", "issue_id": "issue-9"},
            {"sprint_id": "sprint-3", "issue_id": "issue-4"},
            {"sprint_id": "sprint-3", "issue_id": "issue-7"},
        ])
    )

    # ========================
    # COMMENTS
    # ========================
    comments = [
        Comment(
            id="comment-1",
            content="Great progress on the OAuth implementation!",
            issue_id="issue-1",
            author_id="2",
            created_at=now - timedelta(days=6)
        ),
        Comment(
            id="comment-2",
            content="We should also consider adding Apple Sign-In.",
            issue_id="issue-1",
            author_id="3",
            created_at=now - timedelta(days=5)
        ),
        Comment(
            id="comment-3",
            content="I've identified the main performance bottleneck. Working on a fix.",
            issue_id="issue-2",
            author_id="2",
            created_at=now - timedelta(days=2)
        ),
        Comment(
            id="comment-4",
            content="Let's review the caching strategy in our next standup.",
            issue_id="issue-2",
            author_id="1",
            created_at=now - timedelta(days=1)
        ),
        Comment(
            id="comment-5",
            content="Reproduced the bug on Safari mobile. Investigating.",
            issue_id="issue-3",
            author_id="1",
            created_at=now - timedelta(hours=12)
        ),
    ]
    session.add_all(comments)

    # ========================
    # ACTIVITIES
    # ========================
    activities = [
        Activity(
            id="activity-1",
            type=ActivityType.COMPLETED,
            user_id="1",
            target_type=TargetType.ISSUE,
            target_id="issue-1",
            target_title="Implement OAuth2 login flow",
            timestamp=now - timedelta(hours=2)
        ),
        Activity(
            id="activity-2",
            type=ActivityType.COMMENTED,
            user_id="2",
            target_type=TargetType.ISSUE,
            target_id="issue-2",
            target_title="Dashboard performance optimization",
            details="Great progress! Let's review the caching strategy.",
            timestamp=now - timedelta(hours=4)
        ),
        Activity(
            id="activity-3",
            type=ActivityType.ASSIGNED,
            user_id="1",
            target_type=TargetType.ISSUE,
            target_id="issue-3",
            target_title="Fix login redirect bug",
            timestamp=now - timedelta(hours=8)
        ),
        Activity(
            id="activity-4",
            type=ActivityType.CREATED,
            user_id="3",
            target_type=TargetType.ISSUE,
            target_id="issue-9",
            target_title="Design mobile UI mockups",
            timestamp=now - timedelta(days=1)
        ),
        Activity(
            id="activity-5",
            type=ActivityType.UPDATED,
            user_id="2",
            target_type=TargetType.PROJECT,
            target_id="2",
            target_title="API Development",
            details="Updated project timeline",
            timestamp=now - timedelta(days=2)
        ),
    ]
    session.add_all(activities)

    # ========================
    # NOTIFICATIONS
    # ========================
    notifications = [
        Notification(
            id="notification-1",
            type=NotificationType.MENTION,
            title="You were mentioned",
            description="@alice mentioned you in 'Dashboard redesign'",
            user_id="1",
            is_read=False,
            timestamp=now - timedelta(hours=1)
        ),
        Notification(
            id="notification-2",
            type=NotificationType.ASSIGNMENT,
            title="New assignment",
            description="You were assigned to 'Fix login redirect bug'",
            user_id="1",
            is_read=False,
            timestamp=now - timedelta(hours=3)
        ),
        Notification(
            id="notification-3",
            type=NotificationType.COMMENT,
            title="New comment",
            description="Bob commented on 'Dashboard performance optimization'",
            user_id="1",
            is_read=True,
            timestamp=now - timedelta(days=1)
        ),
    ]
    session.add_all(notifications)

    # ========================
    # TIME ENTRIES
    # ========================
    time_entries = [
        TimeEntry(
            id="time-1",
            issue_id="issue-1",
            user_id="1",
            description="OAuth implementation research",
            duration=120,  # 2 hours
            date=date.today() - timedelta(days=7)
        ),
        TimeEntry(
            id="time-2",
            issue_id="issue-1",
            user_id="1",
            description="Google OAuth integration",
            duration=180,  # 3 hours
            date=date.today() - timedelta(days=6)
        ),
        TimeEntry(
            id="time-3",
            issue_id="issue-2",
            user_id="2",
            description="Performance profiling",
            duration=90,  # 1.5 hours
            date=date.today() - timedelta(days=2)
        ),
        TimeEntry(
            id="time-4",
            issue_id="issue-3",
            user_id="1",
            description="Bug investigation",
            duration=60,  # 1 hour
            date=date.today()
        ),
    ]
    session.add_all(time_entries)

    await session.commit()
    print("Database seeded successfully!")


async def clear_database(session: AsyncSession) -> None:
    """Clear all data from the database (for testing)."""
    # Delete in reverse order of dependencies
    await session.execute(sprint_issues.delete())
    await session.execute(issue_labels.delete())
    await session.execute(issue_assignees.delete())
    await session.execute(project_members.delete())

    for model in [TimeEntry, Notification, Activity, Comment, Issue,
                  Milestone, Sprint, Label, Project, User]:
        await session.execute(model.__table__.delete())

    await session.commit()
    print("Database cleared!")
