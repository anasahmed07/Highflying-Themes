from typing import Optional
from datetime import datetime
import uuid
import logging

from .connection import get_database

# Set up logging
logger = logging.getLogger(__name__)


# User collection operations
def get_user_by_email(email: str):
    """Get user by email from MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        user = db.users.find_one({"email": email})
        return user
    except Exception as e:
        logger.error(f"Error in get_user_by_email: {e}")
        raise


def create_user(email: str, username: str, hashed_password: str):
    """Create a new user in MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        user_id = str(uuid.uuid4())
        user = {
            "_id": user_id,
            "email": email,
            "username": username,
            "hashed_password": hashed_password,
            "created_at": datetime.utcnow(),
            "is_active": True,
            "bio": None,
            "location": None,
            "website": None,
            "social_links": {},
            "profile_image": None
        }
        
        result = db.users.insert_one(user)
        if result.inserted_id:
            return user
        else:
            logger.error("Failed to create user - no inserted_id returned")
            return None
    except Exception as e:
        logger.error(f"Error creating user: {e}")
        raise


def update_user(email: str, update_data: dict):
    """Update user in MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        result = db.users.update_one(
            {"email": email},
            {"$set": update_data}
        )
        success = result.modified_count > 0
        if not success:
            logger.warning(f"No user found to update with email: {email}")
        return success
    except Exception as e:
        logger.error(f"Error updating user: {e}")
        raise


def move_user_to_deactivated(email: str) -> bool:
    """Move a user from users to deactivated_users collection."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        user = db.users.find_one({"email": email})
        if not user:
            logger.warning(f"No user found to move to deactivated_users with email: {email}")
            return False
        # Remove _id to avoid duplicate key error in deactivated_users
        user.pop("_id", None)
        user["deactivated_at"] = datetime.utcnow()
        db.deactivated_users.insert_one(user)
        db.users.delete_one({"email": email})
        return True
    except Exception as e:
        logger.error(f"Error moving user to deactivated_users: {e}")
        raise


def get_deactivated_user_by_email(email: str):
    """Get deactivated user by email from deactivated_users collection."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        user = db.deactivated_users.find_one({"email": email})
        return user
    except Exception as e:
        logger.error(f"Error in get_deactivated_user_by_email: {e}")
        raise


def get_deactivated_user_by_username(username: str):
    """Get deactivated user by username from deactivated_users collection."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        user = db.deactivated_users.find_one({"username": username})
        return user
    except Exception as e:
        logger.error(f"Error in get_deactivated_user_by_username: {e}")
        raise


def soft_delete_user(email: str):
    """Soft delete user: move to deactivated_users and remove from users."""
    return move_user_to_deactivated(email)


def hard_delete_user(email: str):
    """Hard delete user: move to deactivated_users and remove from users (same as soft for now)."""
    return move_user_to_deactivated(email)


def get_user_by_id(user_id: str):
    """Get user by ID from MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        user = db.users.find_one({"_id": user_id})
        return user
    except Exception as e:
        logger.error(f"Error getting user by ID: {e}")
        raise


def update_user_profile(email: str, update_data: dict):
    """Update user profile in MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        # Filter out None values to avoid overwriting with None
        filtered_data = {k: v for k, v in update_data.items() if v is not None}
        
        result = db.users.update_one(
            {"email": email},
            {"$set": filtered_data}
        )
        success = result.modified_count > 0
        if not success:
            logger.warning(f"No user found to update profile with email: {email}")
        return success
    except Exception as e:
        logger.error(f"Error updating user profile: {e}")
        raise


# Token blacklist operations
def add_token_to_blacklist(token: str, email: str, expires_at: datetime):
    """Add a token to the blacklist."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        
        blacklisted_token = {
            "token": token,
            "email": email,
            "blacklisted_at": datetime.utcnow(),
            "expires_at": expires_at
        }
        
        result = db.token_blacklist.insert_one(blacklisted_token)
        success = result.inserted_id is not None
        if not success:
            logger.error("Failed to add token to blacklist")
        return success
    except Exception as e:
        logger.error(f"Error adding token to blacklist: {e}")
        raise


def is_token_blacklisted(token: str) -> bool:
    """Check if a token is blacklisted."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        
        blacklisted = db.token_blacklist.find_one({"token": token})
        is_blacklisted = blacklisted is not None
        return is_blacklisted
    except Exception as e:
        logger.error(f"Error checking token blacklist: {e}")
        raise


def blacklist_user_tokens(email: str):
    """Blacklist all tokens for a specific user (when account is deactivated)."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        
        # Add a marker in the blacklist to indicate all tokens for this user are invalid
        marker = {
            "email": email,
            "all_tokens": True,
            "blacklisted_at": datetime.utcnow()
        }
        
        result = db.token_blacklist.insert_one(marker)
        success = result.inserted_id is not None
        if not success:
            logger.error("Failed to blacklist user tokens")
        return success
    except Exception as e:
        logger.error(f"Error blacklisting user tokens: {e}")
        raise


def cleanup_expired_tokens():
    """Clean up expired tokens from blacklist."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        
        result = db.token_blacklist.delete_many({
            "expires_at": {"$lt": datetime.utcnow()}
        })
        deleted_count = result.deleted_count
        return deleted_count
    except Exception as e:
        logger.error(f"Error cleaning up expired tokens: {e}")
        raise


def get_user_by_username(username: str):
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        user = db.users.find_one({"username": username})
        return user
    except Exception as e:
        logger.error(f"Error in get_user_by_username: {e}")
        raise 