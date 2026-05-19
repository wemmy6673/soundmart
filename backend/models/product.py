from sqlalchemy import Column, String, Text, Numeric, Integer, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from database import Base


class Product(Base):
    __tablename__ = "products"

    id             = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name           = Column(String(255), nullable=False)
    description    = Column(Text, nullable=True)
    price          = Column(Numeric(10, 2), nullable=False)
    original_price = Column(Numeric(10, 2), nullable=True)
    category       = Column(String(100), nullable=False)
    tag            = Column(String(50), nullable=True)
    badge          = Column(String(50), nullable=True)
    image_url      = Column(String(500), nullable=True)
    stock          = Column(Integer, nullable=False, default=0)
    is_active      = Column(Boolean, nullable=False, default=True)
    created_at     = Column(DateTime(timezone=True), server_default=func.now())
    updated_at     = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())