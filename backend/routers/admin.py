from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from database import get_db
from models.user import User
from schemas.auth import UserResponse
from core.dependencies import is_admin

router = APIRouter(prefix="/admin", tags=["Admin"])


# ── GET /admin/users ──────────────────────────────────────────────────────────
@router.get("/users", response_model=List[UserResponse])
def get_all_users(
    db: Session = Depends(get_db),
    admin=Depends(is_admin),
):
    """Get all registered users. Admin only."""
    return db.query(User).order_by(User.created_at.desc()).all()


# ── PUT /admin/users/:id/role ─────────────────────────────────────────────────
@router.put("/users/{user_id}/role", response_model=UserResponse)
def update_user_role(
    user_id: UUID,
    role: str,
    db: Session = Depends(get_db),
    admin=Depends(is_admin),
):
    """Promote or demote a user. Admin only."""
    if role not in ("admin", "customer"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role must be 'admin' or 'customer'.",
        )
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    user.role = role
    db.commit()
    db.refresh(user)
    return user