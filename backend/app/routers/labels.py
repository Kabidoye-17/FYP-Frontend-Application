"""
Labels CRUD endpoints.
"""
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import uuid
from app.core.dependencies import get_db
from app.models.label import Label
from app.schemas.label import LabelCreate, LabelResponse

router = APIRouter(prefix="/labels", tags=["Labels"])


@router.get("", response_model=List[LabelResponse])
async def list_labels(db: AsyncSession = Depends(get_db)):
    """
    Get all labels.
    """
    result = await db.execute(select(Label).order_by(Label.name))
    labels = result.scalars().all()
    return labels


@router.post("", response_model=LabelResponse)
async def create_label(label_data: LabelCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new label.
    """
    # Check for duplicate name
    result = await db.execute(select(Label).where(Label.name == label_data.name))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Label with this name already exists")

    label = Label(
        id=label_data.id or f"label-{uuid.uuid4().hex[:8]}",
        name=label_data.name,
        color=label_data.color
    )
    db.add(label)
    await db.commit()
    await db.refresh(label)
    return label


@router.delete("/{label_id}")
async def delete_label(label_id: str, db: AsyncSession = Depends(get_db)):
    """
    Delete a label.
    """
    result = await db.execute(select(Label).where(Label.id == label_id))
    label = result.scalar_one_or_none()

    if not label:
        raise HTTPException(status_code=404, detail="Label not found")

    await db.delete(label)
    await db.commit()
    return {"message": "Label deleted successfully"}
