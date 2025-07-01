from fastapi import APIRouter

health_check_router = APIRouter()

@health_check_router.get("/")
async def healthcheck():
    """Root endpoint for health check."""
    return {"message": "Switch Theme API is running!"}

@health_check_router.get("/test-db")
async def test_database():
    """Test database connection."""
    try:
        from database import test_connection
        is_connected = test_connection()
        if is_connected:
            return {"status": "success", "message": "Database connected successfully"}
        else:
            return {"status": "error", "message": "Database connection failed"}
    except Exception as e:
        return {"status": "error", "message": f"Database error: {str(e)}"}