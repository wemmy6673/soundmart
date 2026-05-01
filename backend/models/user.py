from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from database import Base


class User(Base):
    __tablename__ = "users"

    id         = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name       = Column(String(100), nullable=False)
    email      = Column(String(255), nullable=False, unique=True, index=True)
    password   = Column(String(255), nullable=True)   # null for Google OAuth users
    role       = Column(String(20), nullable=False, default="customer")
    google_id  = Column(String(255), nullable=True, index=True)
    avatar_url = Column(String(500), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())