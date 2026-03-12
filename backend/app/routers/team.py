"""
Team/Users endpoints.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.dependencies import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserBrief

router = APIRouter(prefix="/team", tags=["Team"])


@router.get("", response_model=List[UserBrief])
async def list_team_members(db: AsyncSession = Depends(get_db)):
    """
    Get all team members.
    Returns brief user info suitable for dropdowns and lists.
    """
    result = await db.execute(select(User).order_by(User.name))
    users = result.scalars().all()
    return users


@router.get("/{user_id}", response_model=UserResponse)
async def get_team_member(user_id: str, db: AsyncSession = Depends(get_db)):
    """
    Get detailed information about a team member.
    """
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.post("/invite")
async def invite_team_member():
    """
    Invite a new team member (stub for demo).
    """
    return {"message": "Invitation sent (demo mode)"}
