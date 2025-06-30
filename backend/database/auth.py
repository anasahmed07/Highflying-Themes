from typing import Optional
from datetime import datetime
import uuid
import asyncio

from .connection import get_database


# User collection operations
async def get_user_by_email(email: str):
    """Get user by email from MongoDB."""
    try:
        db = get_database()
        if db is None:
            return None
        
        user = await db.users.find_one({"email": email})
        return user
    except Exception as e:
        print(f"Error in get_user_by_email: {e}")
        return None


async def create_user(email: str, username: str, hashed_password: str):
    """Create a new user in MongoDB."""
    db = get_database()
    if db is None:
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
    
    result = await db.users.insert_one(user)
    if result.inserted_id:
        return user
    return None


async def update_user(email: str, update_data: dict):
    """Update user in MongoDB."""
    db = get_database()
    if db is None:
        return None
    
    result = await db.users.update_one(
        {"email": email},
        {"$set": update_data}
    )
    return result.modified_count > 0


async def soft_delete_user(email: str):
    """Soft delete user from MongoDB (set is_active to False)."""
    db = get_database()
    if db is None:
        return False
    
    result = await db.users.update_one(
        {"email": email},
        {"$set": {"is_active": False}}
    )
    return result.modified_count > 0


async def hard_delete_user(email: str):
    """Hard delete user from MongoDB (permanently remove)."""
    db = get_database()
    if db is None:
        return False
    
    result = await db.users.delete_one({"email": email})
    return result.deleted_count > 0


async def get_user_by_id(user_id: str):
    """Get user by ID from MongoDB."""
    db = get_database()
    if db is None:
        return None
    
    user = await db.users.find_one({"_id": user_id})
    return user


async def update_user_profile(email: str, update_data: dict):
    """Update user profile in MongoDB."""
    db = get_database()
    if db is None:
        return None
    
    # Filter out None values to avoid overwriting with None
    filtered_data = {k: v for k, v in update_data.items() if v is not None}
    
    result = await db.users.update_one(
        {"email": email},
        {"$set": filtered_data}
    )
    return result.modified_count > 0


# Token blacklist operations
async def add_token_to_blacklist(token: str, email: str, expires_at: datetime):
    """Add a token to the blacklist."""
    db = get_database()
    if db is None:
        return False
    
    blacklisted_token = {
        "token": token,
        "email": email,
        "blacklisted_at": datetime.utcnow(),
        "expires_at": expires_at
    }
    
    result = await db.token_blacklist.insert_one(blacklisted_token)
    return result.inserted_id is not None


async def is_token_blacklisted(token: str) -> bool:
    """Check if a token is blacklisted."""
    db = get_database()
    if db is None:
        return False
    
    blacklisted = await db.token_blacklist.find_one({"token": token})
    return blacklisted is not None


async def blacklist_user_tokens(email: str):
    """Blacklist all tokens for a specific user (when account is deactivated)."""
    db = get_database()
    if db is None:
        return False
    
    # Add a marker in the blacklist to indicate all tokens for this user are invalid
    marker = {
        "email": email,
        "all_tokens": True,
        "blacklisted_at": datetime.utcnow()
    }
    
    result = await db.token_blacklist.insert_one(marker)
    return result.inserted_id is not None


async def cleanup_expired_tokens():
    """Clean up expired tokens from blacklist."""
    db = get_database()
    if db is None:
        return False
    
    result = await db.token_blacklist.delete_many({
        "expires_at": {"$lt": datetime.utcnow()}
    })
    return result.deleted_count 