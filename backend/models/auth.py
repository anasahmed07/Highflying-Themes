from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ProfileUpdate(BaseModel):
    username: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    social_links: Optional[dict] = None


class UserResponse(UserBase):
    id: str = Field(alias="_id")
    created_at: datetime
    bio: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    social_links: Optional[dict] = None
    profile_image: Optional[str] = None

    class Config:
        from_attributes = True
        populate_by_name = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    email: Optional[str] = None


class PasswordReset(BaseModel):
    email: EmailStr


class PasswordChange(BaseModel):
    current_password: str
    new_password: str 