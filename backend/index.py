from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

# Import routers
from auth.routes import auth_router
from contact.routes import contact_router
from database import connect_to_mongo, close_mongo_connection

# Lifespan context manager for database connections
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()

# Initialize FastAPI app
app = FastAPI(
    title="Highflying Themes API",
    description="API for Highflying Themes platform",
    version="1.0.0",
    lifespan=lifespan
)

health_check_router = APIRouter()
@health_check_router.get("/")
async def healthcheck():
    """Root endpoint for health check."""
    return {"message": "Highflying Themes API is running!"}

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
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