from fastapi import APIRouter, HTTPException, status, Depends, Query, Request, UploadFile, File, Form
from datetime import timedelta
from PIL import Image
import io
import base64
import sys
import os

# Add the backend directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models import UserCreate, UserLogin, UserResponse, Token, PasswordReset, PasswordChange, ProfileUpdate
from .utils import (
    get_password_hash, 
    create_access_token, 
    get_current_user,
    verify_password,
    logout_user,
    invalidate_user_tokens,
    ACCESS_TOKEN_EXPIRE_MINUTES
)
from database import (
    get_user_by_email,
    create_user,
    update_user,
    update_user_profile,
    soft_delete_user,
    hard_delete_user
)

# Create router
auth_router = APIRouter()


@auth_router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserCreate):
    """Register a new user."""
    # Check if user already exists
    existing_user = get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password and create user
    hashed_password = get_password_hash(user_data.password)
    user = create_user(
        email=user_data.email,
        username=user_data.username,
        hashed_password=hashed_password
    )
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user"
        )
    
    # Convert MongoDB document to UserResponse
    return UserResponse(
        _id=user["_id"],
        email=user["email"],
        username=user["username"],
        created_at=user["created_at"],
        is_active=user["is_active"]
    )


@auth_router.post("/login", response_model=Token)
async def login(user_credentials: UserLogin):
    """Authenticate user and return access token."""
    user = get_user_by_email(user_credentials.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(user_credentials.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.post("/logout")
async def logout(request: Request, current_user: dict = Depends(get_current_user)):
    """Logout user by invalidating their token."""
    # Get the token from the request headers
    auth_header = request.headers.get("Authorization")
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
        success = logout_user(token, current_user.email)
        if success:
            return {"message": "Successfully logged out"}
    return {"message": "Logout successful"}


@auth_router.get("/profile", response_model=UserResponse)
async def get_profile(current_user: dict = Depends(get_current_user)):
    """Get current user profile."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return UserResponse(
        _id=user["_id"],
        email=user["email"],
        username=user["username"],
        created_at=user["created_at"],
        is_active=user["is_active"],
        bio=user.get("bio"),
        location=user.get("location"),
        website=user.get("website"),
        social_links=user.get("social_links", {}),
        profile_image=user.get("profile_image")
    )


@auth_router.put("/profile", response_model=UserResponse)
async def update_profile(
    profile_data: ProfileUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update user profile."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Convert profile data to dict, excluding None values
    update_data = profile_data.dict(exclude_unset=True)
    
    # Update profile
    success = update_user_profile(current_user.email, update_data)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update profile"
        )
    
    # Get updated user
    updated_user = get_user_by_email(current_user.email)
    return UserResponse(
        _id=updated_user["_id"],
        email=updated_user["email"],
        username=updated_user["username"],
        created_at=updated_user["created_at"],
        is_active=updated_user["is_active"],
        bio=updated_user.get("bio"),
        location=updated_user.get("location"),
        website=updated_user.get("website"),
        social_links=updated_user.get("social_links", {}),
        profile_image=updated_user.get("profile_image")
    )


@auth_router.post("/change-password")
async def change_password(
    password_data: PasswordChange,
    current_user: dict = Depends(get_current_user)
):
    """Change user password."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Verify current password
    if not verify_password(password_data.current_password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Update password
    hashed_new_password = get_password_hash(password_data.new_password)
    success = update_user(current_user.email, {"hashed_password": hashed_new_password})
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update password"
        )
    
    return {"message": "Password updated successfully"}


@auth_router.post("/reset-password")
async def reset_password(password_data: PasswordReset):
    """Request password reset (placeholder for email functionality)."""
    user = get_user_by_email(password_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot reset password for deactivated account"
        )
    
    # In a real application, you would:
    # 1. Generate a reset token
    # 2. Send an email with the reset link
    # 3. Store the reset token with expiration
    
    return {"message": "Password reset email sent (placeholder)"}


@auth_router.delete("/delete-account")
async def delete_account(
    hard_delete: bool = Query(False, description="Permanently delete account (default: soft delete)"),
    current_user: dict = Depends(get_current_user)
):
    """Delete user account (soft delete by default, hard delete if specified)."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account is already deactivated"
        )
    
    if hard_delete:
        # Hard delete - permanently remove from database
        success = hard_delete_user(current_user.email)
        message = "Account permanently deleted"
    else:
        # Soft delete - set is_active to False and invalidate all tokens
        success = soft_delete_user(current_user.email)
        if success:
            # Invalidate all tokens for this user
            invalidate_user_tokens(current_user.email)
        message = "Account deactivated (soft delete) - all tokens invalidated"
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete account"
        )
    
    return {"message": message, "hard_delete": hard_delete}


@auth_router.get("/verify-token")
async def verify_token_endpoint(current_user: dict = Depends(get_current_user)):
    """Verify if the current token is valid."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return {"valid": True, "email": current_user.email}


@auth_router.post("/upload-profile-image")
async def upload_profile_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload a new profile image."""
    user = get_user_by_email(current_user.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if account is active
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account is deactivated. Please contact support.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be an image"
        )
    
    # Validate file size (max 5MB)
    if file.size > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size must be less than 5MB"
        )
    
    try:
        # Read and process the image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Resize image to 200x200 for profile pictures
        image = image.resize((200, 200), Image.Resampling.LANCZOS)
        
        # Convert to RGB if necessary (for JPEG format)
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Save to bytes buffer
        buffer = io.BytesIO()
        image.save(buffer, format='JPEG', quality=85, optimize=True)
        image_bytes = buffer.getvalue()
        
        # Convert to Base64 for storage in MongoDB
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        # Check if the Base64 string is too large (MongoDB has 16MB document limit)
        # Base64 increases size by ~33%, so we need to ensure the original image is under ~12MB
        if len(image_base64) > 12 * 1024 * 1024:  # 12MB limit for Base64
            # Further compress the image
            buffer = io.BytesIO()
            image.save(buffer, format='JPEG', quality=60, optimize=True)
            image_bytes = buffer.getvalue()
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            
            # If still too large, resize further
            if len(image_base64) > 12 * 1024 * 1024:
                image = image.resize((150, 150), Image.Resampling.LANCZOS)
                buffer = io.BytesIO()
                image.save(buffer, format='JPEG', quality=50, optimize=True)
                image_bytes = buffer.getvalue()
                image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        # Create data URL for frontend
        image_data_url = f"data:image/jpeg;base64,{image_base64}"
        
        # Update user profile with image data
        success = update_user_profile(current_user.email, {"profile_image": image_data_url})
        
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to update profile with image"
            )
        
        return {"message": "Profile image uploaded successfully", "image_url": image_data_url}
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        ) 