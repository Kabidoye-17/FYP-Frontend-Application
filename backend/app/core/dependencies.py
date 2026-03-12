"""
FastAPI dependencies for dependency injection.
"""
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import async_session_maker


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency that provides a database session.
    Yields a session and ensures it's closed after use.
    """
    async with async_session_maker() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


def get_current_user_id() -> str:
    """
    Returns the current user ID.
    For demo purposes, always returns user "1" (Alice Johnson).
    In a real app, this would validate JWT and return the user ID.
    """
    return "1"
