"""
Authentication endpoints.
For demo purposes - uses simple password comparison (not production-safe).
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional
import uuid
from app.core.dependencies import get_db, get_current_user_id
from app.models.user import User, UserRole
from app.schemas.user import UserResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Demo password - all seeded users use this password
DEMO_PASSWORD = "password123"


class LoginRequest(BaseModel):
    """Login request body."""
    email: str
    password: str


class SignupRequest(BaseModel):
    """Signup request body."""
    name: str
    email: str
    password: str


class AuthResponse(BaseModel):
    """Authentication response with user and token."""
    user: UserResponse
    token: str

    class Config:
        from_attributes = True


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Get current user information.
    For demo: returns user based on current_user_id from token.
    """
    result = await db.execute(select(User).where(User.id == current_user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user


@router.post("/login", response_model=AuthResponse)
async def login(
    credentials: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Login with email and password.
    For demo: accepts the demo password for any seeded user.
    """
    # Find user by email
    result = await db.execute(select(User).where(User.email == credentials.email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Check password (demo: accept DEMO_PASSWORD or user's password_hash)
    valid_password = (
        credentials.password == DEMO_PASSWORD or
        (user.password_hash and credentials.password == user.password_hash)
    )

    if not valid_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Generate demo token (in production, use JWT)
    token = f"demo-token-{user.id}-{uuid.uuid4().hex[:8]}"

    return AuthResponse(user=user, token=token)


@router.post("/signup", response_model=AuthResponse)
async def signup(
    data: SignupRequest,
    db: AsyncSession = Depends(get_db)
):
    """
    Sign up a new user.
    Creates a new user account with the provided information.
    """
    # Check if email already exists
    result = await db.execute(select(User).where(User.email == data.email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists"
        )

    # Create new user
    new_user = User(
        id=str(uuid.uuid4()),
        email=data.email,
        name=data.name,
        password_hash=data.password,  # Demo: store plain password (not production-safe!)
        role=UserRole.MEMBER,
        color="#727272"
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    # Generate demo token
    token = f"demo-token-{new_user.id}-{uuid.uuid4().hex[:8]}"

    return AuthResponse(user=new_user, token=token)


@router.post("/logout")
async def logout():
    """
    Logout endpoint.
    For demo: just returns success (no server-side session to invalidate).
    """
    return {"message": "Logged out successfully"}


@router.post("/refresh", response_model=AuthResponse)
async def refresh_token(
    db: AsyncSession = Depends(get_db),
    current_user_id: str = Depends(get_current_user_id)
):
    """
    Refresh the authentication token.
    Returns a new token for the current user.
    """
    result = await db.execute(select(User).where(User.id == current_user_id))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    # Generate new token
    token = f"demo-token-{user.id}-{uuid.uuid4().hex[:8]}"

    return AuthResponse(user=user, token=token)
