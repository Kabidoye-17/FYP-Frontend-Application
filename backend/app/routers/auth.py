"""
Authentication endpoints.
For demo purposes, always returns user "1" (Alice Johnson) - no real auth required.
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.dependencies import get_db, get_current_user_id
from app.models.user import User
from app.schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Get current user information.
    For demo: always returns Alice Johnson (user ID "1").
    """
    result = await db.execute(select(User).where(User.id == current_user_id))
    user = result.scalar_one_or_none()

    if not user:
        # Return a default user for demo
        return UserResponse(
            id="1",
            name="Alice Johnson",
            email="alice@example.com",
            color="#B24F9F",
            role="admin",
            created_at=None,
            updated_at=None
        )

    return user


@router.post("/login")
async def login():
    """
    Login endpoint (stub for demo).
    No real authentication - always succeeds.
    """
    return {
        "message": "Login successful",
        "user_id": "1",
        "access_token": "demo-token-not-real"
    }


@router.post("/signup")
async def signup():
    """
    Signup endpoint (stub for demo).
    No real registration - always succeeds.
    """
    return {
        "message": "Signup successful",
        "user_id": "1"
    }


@router.post("/logout")
async def logout():
    """
    Logout endpoint (stub for demo).
    """
    return {"message": "Logged out successfully"}


@router.post("/refresh")
async def refresh_token():
    """
    Refresh token endpoint (stub for demo).
    """
    return {
        "access_token": "demo-token-refreshed-not-real"
    }
