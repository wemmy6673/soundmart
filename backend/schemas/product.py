from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


# ── Request schemas ────────────────────────────────────────────────────────────

class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    category: str
    tag: Optional[str] = None
    badge: Optional[str] = None
    image_url: Optional[str] = None
    stock: int = 0


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    original_price: Optional[float] = None
    category: Optional[str] = None
    tag: Optional[str] = None
    badge: Optional[str] = None
    image_url: Optional[str] = None
    stock: Optional[int] = None
    is_active: Optional[bool] = None


# ── Response schema ────────────────────────────────────────────────────────────

class ProductResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str] = None
    price: float
    original_price: Optional[float] = None
    category: str
    tag: Optional[str] = None
    badge: Optional[str] = None
    image_url: Optional[str] = None
    stock: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True