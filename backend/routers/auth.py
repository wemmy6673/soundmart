from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import httpx

from database import get_db
from models.user import User
from schemas.auth import RegisterRequest, LoginRequest, GoogleAuthRequest, TokenResponse, UserResponse
from core.security import hash_password, verify_password, create_access_token
from core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ── POST /auth/register ───────────────────────────────────────────────────────
@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    """Register a new user with email and password."""

    # Check if email is already taken
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email already exists.",
        )

    # Create user with hashed password
    user = User(
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password),
        role="customer",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Generate JWT
    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {"access_token": token, "token_type": "bearer", "user": user}


# ── POST /auth/login ──────────────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    """Log in with email and password."""

    user = db.query(User).filter(User.email == payload.email).first()

    # Generic error — don't reveal whether email exists or not
    auth_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Incorrect email or password.",
    )

    if not user:
        raise auth_error

    # Google-only users have no password
    if not user.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This account was created with Google. Please sign in with Google.",
        )

    if not verify_password(payload.password, user.password):
        raise auth_error

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {"access_token": token, "token_type": "bearer", "user": user}


# ── POST /auth/google ─────────────────────────────────────────────────────────
@router.post("/google", response_model=TokenResponse)
async def google_auth(payload: GoogleAuthRequest, db: Session = Depends(get_db)):
    """
    Verify a Google OAuth access token, then find or create the user.
    The frontend sends the Google access_token after the user approves consent.
    """

    # Use the Google access token to fetch the user's profile
    async with httpx.AsyncClient() as client:
        response = await client.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={"Authorization": f"Bearer {payload.token}"},
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token. Please try again.",
        )

    google_data = response.json()
    google_id   = google_data.get("id")
    email       = google_data.get("email")
    name        = google_data.get("name", "")
    avatar_url  = google_data.get("picture", "")

    # Check if user already exists (by Google ID or email)
    user = (
        db.query(User).filter(User.google_id == google_id).first()
        or db.query(User).filter(User.email == email).first()
    )

    if user:
        # Update google_id and avatar if signing in with Google for the first time
        if not user.google_id:
            user.google_id = google_id
        if avatar_url:
            user.avatar_url = avatar_url
        db.commit()
        db.refresh(user)
    else:
        # New user — create account (no password needed)
        user = User(
            name=name,
            email=email,
            google_id=google_id,
            avatar_url=avatar_url,
            role="customer",
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    token = create_access_token({"sub": str(user.id), "role": user.role})

    return {"access_token": token, "token_type": "bearer", "user": user}


# ── GET /auth/me ──────────────────────────────────────────────────────────────
@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    """Return the currently logged-in user's profile."""
    return current_user