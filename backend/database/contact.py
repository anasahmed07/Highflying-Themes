from datetime import datetime
import uuid
import logging

from .connection import get_database

# Set up logging
logger = logging.getLogger(__name__)


# Contact message operations
def create_contact_message(name: str, email: str, subject: str, message: str):
    """Create a new contact message in MongoDB."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
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
        
        logger.info(f"Attempting to insert contact message with ID: {message_id}")
        result = db.contact_messages.insert_one(contact_message)
        if result.inserted_id:
            logger.info(f"Contact message inserted successfully with ID: {result.inserted_id}")
            return contact_message
        else:
            logger.error("Failed to insert contact message - no inserted_id returned")
            return None
    except Exception as e:
        logger.error(f"Error creating contact message: {e}")
        raise


def get_contact_messages(limit: int = 50, skip: int = 0):
    """Get contact messages with pagination."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return []
        
        cursor = db.contact_messages.find().sort("created_at", -1).skip(skip).limit(limit)
        messages = list(cursor)
        logger.info(f"Retrieved {len(messages)} contact messages")
        return messages
    except Exception as e:
        logger.error(f"Error retrieving contact messages: {e}")
        raise


def get_contact_message_by_id(message_id: str):
    """Get a specific contact message by ID."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return None
        
        message = db.contact_messages.find_one({"_id": message_id})
        if message:
            logger.info(f"Retrieved contact message with ID: {message_id}")
        else:
            logger.warning(f"Contact message with ID {message_id} not found")
        return message
    except Exception as e:
        logger.error(f"Error retrieving contact message by ID: {e}")
        raise


def update_contact_message_status(message_id: str, status: str):
    """Update the status of a contact message."""
    try:
        db = get_database()
        if db is None:
            logger.error("Database connection is None")
            return False
        
        result = db.contact_messages.update_one(
            {"_id": message_id},
            {"$set": {"status": status}}
        )
        success = result.modified_count > 0
        if not success:
            logger.warning(f"No contact message found with ID {message_id} to update")
        return success
    except Exception as e:
        logger.error(f"Error updating contact message status: {e}")
        raise 