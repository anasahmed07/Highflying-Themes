from motor.motor_asyncio import AsyncIOMotorClient
import os
from typing import Optional
import asyncio

# MongoDB configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "highflying_themes")

# Database client - lazy initialization for serverless
_client: Optional[AsyncIOMotorClient] = None
_database = None


def get_client() -> AsyncIOMotorClient:
    """Get MongoDB client with lazy initialization."""
    global _client
    if _client is None:
        # Configure connection pooling for serverless
        _client = AsyncIOMotorClient(
            MONGODB_URL,
            maxPoolSize=1,  # Smaller pool for serverless
            minPoolSize=0,  # No minimum pool for serverless
            maxIdleTimeMS=30000,  # Close idle connections after 30 seconds
            serverSelectionTimeoutMS=5000,  # Faster timeout
            connectTimeoutMS=5000,
            socketTimeoutMS=5000,
            # Serverless-specific settings
            retryWrites=False,
            retryReads=False,
            directConnection=True
        )
    return _client


def get_database():
    """Get database instance with lazy initialization."""
    global _database
    if _database is None:
        client = get_client()
        _database = client[DATABASE_NAME]
    return _database


async def test_connection():
    """Test database connection safely for serverless."""
    try:
        db = get_database()
        # Use a simple ping operation
        await db.command("ping")
        return True
    except Exception:
        return False


async def connect_to_mongo():
    """Connect to MongoDB (for compatibility, but not needed in serverless)."""
    # In serverless, connections are lazy-initialized
    get_database()
    print("MongoDB client initialized")


async def close_mongo_connection():
    """Close MongoDB connection (for compatibility)."""
    global _client
    if _client:
        _client.close()
        _client = None
        print("MongoDB client closed") 