from datetime import datetime
import uuid

from .connection import get_database


# Contact message operations
async def create_contact_message(name: str, email: str, subject: str, message: str):
    """Create a new contact message in MongoDB."""
    db = get_database()
    if db is None:
        return None
    
    message_id = str(uuid.uuid4())
    contact_message = {
        "_id": message_id,
        "name": name,
        "email": email,
        "subject": subject,
        "message": message,
        "created_at": datetime.utcnow(),
        "status": "unread"  # unread, read, responded
    }
    
    result = await db.contact_messages.insert_one(contact_message)
    if result.inserted_id:
        return contact_message
    return None


async def get_contact_messages(limit: int = 50, skip: int = 0):
    """Get contact messages with pagination."""
    db = get_database()
    if db is None:
        return []
    
    cursor = db.contact_messages.find().sort("created_at", -1).skip(skip).limit(limit)
    messages = await cursor.to_list(length=limit)
    return messages


async def get_contact_message_by_id(message_id: str):
    """Get a specific contact message by ID."""
    db = get_database()
    if db is None:
        return None
    
    message = await db.contact_messages.find_one({"_id": message_id})
    return message


async def update_contact_message_status(message_id: str, status: str):
    """Update the status of a contact message."""
    db = get_database()
    if db is None:
        return False
    
    result = await db.contact_messages.update_one(
        {"_id": message_id},
        {"$set": {"status": status}}
    )
    return result.modified_count > 0 