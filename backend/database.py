from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

# Test the connection
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM users"))
    print("✅ Database connected successfully!")

    