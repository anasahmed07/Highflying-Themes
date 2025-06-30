import dotenv
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os

# Import routers
from auth.routes import auth_router
from contact.routes import contact_router

dotenv.load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Highflying Themes API",
    description="API for Highflying Themes platform",
    version="1.0.0"
)

health_check_router = APIRouter()
@health_check_router.get("/")
async def healthcheck():
    """Root endpoint for health check."""
    return {"message": "Highflying Themes API is running!"}

@health_check_router.get("/test-db")
async def test_database():
    """Test database connection."""
    try:
        from database import get_database
        db = get_database()
        if db is None:
            return {"status": "error", "message": "Database not initialized"}
        
        # Test a simple operation without exposing data
        await db.users.find_one({}, {"_id": 1})
        return {"status": "success", "message": "Database connected successfully"}
    except Exception as e:
        return {"status": "error", "message": f"Database error: {str(e)}"}

# CORS middleware for frontend integration
# Get allowed origins from environment variable
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # Use environment variable
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health_check_router, prefix="", tags=["health-check"])
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(contact_router, prefix="/contact", tags=["contact"])

# For Vercel serverless deployment
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True) 