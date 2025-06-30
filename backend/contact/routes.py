from fastapi import APIRouter, HTTPException, status
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import ContactMessage
from database import create_contact_message

# Create router
contact_router = APIRouter()


@contact_router.post("/submit")
async def submit_contact_message(contact_data: ContactMessage):
    """Submit a contact message."""
    try:
        # Create contact message in database
        message = await create_contact_message(
            name=contact_data.name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message
        )
        
        if not message:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to submit contact message"
            )
        
        # In a real application, you would:
        # 1. Send an email notification to admin
        # 2. Send a confirmation email to the user
        # 3. Log the contact message
        
        return {
            "message": "Contact message submitted successfully",
            "id": message["_id"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit contact message: {str(e)}"
        ) 