from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def healthcheck():
    """Root endpoint for health check."""
    return {"message": "Switch Theme API is running!"}

@router.get("/db-status")
async def database_status():
    """Test database connection."""
    try:
        from database import test_connection
        is_connected = test_connection()
        if is_connected:
            return {"status": "success", "message": "Database tested successfully"}
        else:
            return {"status": "error", "message": "Database connection failed"}
    except Exception as e:
        return {"status": "error", "message": f"Database error: {str(e)}"}