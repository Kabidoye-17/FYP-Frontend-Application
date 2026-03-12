"""
Notifications endpoints.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.dependencies import get_db, get_current_user_id
from app.models.notification import Notification
from app.models.activity import Activity
from app.schemas.notification import NotificationResponse
from app.schemas.activity import ActivityResponse

router = APIRouter(tags=["Notifications & Activities"])


# ========================
# NOTIFICATIONS
# ========================

@router.get("/notifications", response_model=List[NotificationResponse])
async def list_notifications(
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Get notifications for the current user.
    """
    result = await db.execute(
        select(Notification)
        .where(Notification.user_id == current_user_id)
        .order_by(Notification.timestamp.desc())
    )
    notifications = result.scalars().all()

    return [
        {
            "id": n.id,
            "type": n.type.value if n.type else "mention",
            "title": n.title,
            "description": n.description,
            "timestamp": n.timestamp,
            "is_read": n.is_read
        }
        for n in notifications
    ]


@router.put("/notifications/{notification_id}/read")
async def mark_notification_read(
    notification_id: str,
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Mark a notification as read.
    """
    result = await db.execute(
        select(Notification)
        .where(
            Notification.id == notification_id,
            Notification.user_id == current_user_id
        )
    )
    notification = result.scalar_one_or_none()

    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")

    notification.is_read = True
    await db.commit()

    return {"message": "Notification marked as read"}


@router.put("/notifications/read-all")
async def mark_all_notifications_read(
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Mark all notifications as read.
    """
    result = await db.execute(
        select(Notification)
        .where(
            Notification.user_id == current_user_id,
            Notification.is_read == False
        )
    )
    notifications = result.scalars().all()

    for notification in notifications:
        notification.is_read = True

    await db.commit()

    return {"message": f"Marked {len(notifications)} notifications as read"}


# ========================
# ACTIVITIES
# ========================

@router.get("/activities", response_model=List[ActivityResponse])
async def list_activities(
    db: AsyncSession = Depends(get_db),
    limit: int = 20
):
    """
    Get recent activities.
    """
    from sqlalchemy.orm import selectinload

    result = await db.execute(
        select(Activity)
        .options(selectinload(Activity.user))
        .order_by(Activity.timestamp.desc())
        .limit(limit)
    )
    activities = result.scalars().all()

    return [
        {
            "id": a.id,
            "type": a.type.value if a.type else "updated",
            "user": {
                "name": a.user.name if a.user else "Unknown",
                "color": a.user.color if a.user else "#727272"
            },
            "target": a.target_title,
            "target_type": a.target_type.value if a.target_type else "issue",
            "details": a.details,
            "timestamp": a.timestamp
        }
        for a in activities
    ]
