"""
Calendar events endpoints.
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
import uuid
from app.core.dependencies import get_db
from app.models.calendar_event import CalendarEvent
from app.schemas.calendar_event import (
    CalendarEventCreate,
    CalendarEventUpdate,
    CalendarEventResponse,
)

router = APIRouter(prefix="/calendar", tags=["Calendar"])


@router.get("", response_model=List[CalendarEventResponse])
async def list_calendar_events(
    db: AsyncSession = Depends(get_db)
):
    """List all calendar events."""
    result = await db.execute(
        select(CalendarEvent).order_by(CalendarEvent.date)
    )
    return result.scalars().all()


@router.get("/{event_id}", response_model=CalendarEventResponse)
async def get_calendar_event(
    event_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Get a calendar event by ID."""
    result = await db.execute(
        select(CalendarEvent).where(CalendarEvent.id == event_id)
    )
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Calendar event not found"
        )

    return event


@router.post("", response_model=CalendarEventResponse, status_code=status.HTTP_201_CREATED)
async def create_calendar_event(
    event_data: CalendarEventCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new calendar event."""
    event = CalendarEvent(
        id=str(uuid.uuid4()),
        title=event_data.title,
        description=event_data.description,
        date=event_data.date,
        type=event_data.type,
    )

    db.add(event)
    await db.commit()
    await db.refresh(event)

    return event


@router.put("/{event_id}", response_model=CalendarEventResponse)
async def update_calendar_event(
    event_id: str,
    event_data: CalendarEventUpdate,
    db: AsyncSession = Depends(get_db)
):
    """Update a calendar event."""
    result = await db.execute(
        select(CalendarEvent).where(CalendarEvent.id == event_id)
    )
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Calendar event not found"
        )

    # Update fields that were provided
    update_data = event_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(event, field, value)

    await db.commit()
    await db.refresh(event)

    return event


@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_calendar_event(
    event_id: str,
    db: AsyncSession = Depends(get_db)
):
    """Delete a calendar event."""
    result = await db.execute(
        select(CalendarEvent).where(CalendarEvent.id == event_id)
    )
    event = result.scalar_one_or_none()

    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Calendar event not found"
        )

    await db.delete(event)
    await db.commit()
