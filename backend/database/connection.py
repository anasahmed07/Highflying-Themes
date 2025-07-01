from pymongo import MongoClient
import os
from typing import Optional
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB configuration
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "switch_theme")

# Database client - lazy initialization for serverless
_client: Optional[MongoClient] = None
_database = None


def get_client() -> MongoClient:
    """Get MongoDB client with lazy initialization."""
    global _client
    if _client is None:
        try:
            logger.info(f"Initializing MongoDB client")
            _client = MongoClient(
                MONGODB_URL,
                maxPoolSize=10,
                minPoolSize=0,
                maxIdleTimeMS=30000,
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=5000,
                socketTimeoutMS=5000,
            )
            logger.info("MongoDB client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize MongoDB client: {e}")
            raise
    return _client


def get_database():
    """Get database instance with lazy initialization."""
    global _database
    if _database is None:
        try:
            client = get_client()
            _database = client[DATABASE_NAME]
            logger.info(f"Database '{DATABASE_NAME}' initialized")
        except Exception as e:
            logger.error(f"Failed to get database: {e}")
            raise
    return _database


def test_connection():
    """Test database connection safely for serverless."""
    try:
        db = get_database()
        db.command("ping")
        logger.info("Database connection test successful")
        return True
    except Exception as e:
        logger.error(f"Database connection test failed: {e}")
        return False


def connect_to_mongo():
    """Connect to MongoDB (for compatibility, but not needed in serverless)."""
    get_database()
    logger.info("MongoDB client initialized")


def close_mongo_connection():
    """Close MongoDB connection (for compatibility)."""
    global _client
    if _client:
        _client.close()
        _client = None
        logger.info("MongoDB client closed") 