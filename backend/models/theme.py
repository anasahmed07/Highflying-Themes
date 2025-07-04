from pydantic import BaseModel, Field, field_validator
from typing import List, Optional
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {"type": "string"}


class ThemeBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100, description="Theme name")
    author_name: str = Field(..., min_length=1, max_length=100, description="Author name")
    short_description: str = Field(..., min_length=1, max_length=200, description="Short description")
    description: str = Field(..., min_length=1, max_length=2000, description="Full description")
    tags: List[str] = Field(default=[], description="Theme tags")


class ThemeCreate(ThemeBase):
    pass


class ThemeUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    author_name: Optional[str] = Field(None, min_length=1, max_length=100)
    short_description: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = Field(None, min_length=1, max_length=2000)
    tags: Optional[List[str]] = Field(None)


class ThemeResponse(ThemeBase):
    id: Optional[str] = Field(None, alias="_id", description="MongoDB document ID")
    theme_id: Optional[int] = Field(None, description="Integer theme ID for compatibility")
    user_id: str = Field(..., description="User ID who uploaded the theme")
    zip_file_id: str = Field(..., description="GridFS file ID for ZIP file")
    preview_b64: Optional[str] = Field(None, description="Base64 encoded preview image")
    icon_b64: Optional[str] = Field(None, description="Base64 encoded icon image")
    bgm_info: Optional[str] = Field(None, description="BGM information")
    download_count: int = Field(default=0, description="Number of downloads")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        validate_by_name = True
        arbitrary_types_allowed = True


class ThemeListResponse(BaseModel):
    themes: List[ThemeResponse]
    total: int
    page: int
    limit: int


class ThemeFileInfo(BaseModel):
    filename: str
    content_type: str
    size: int
    file_id: str = Field(..., description="MongoDB ObjectId as string")

    @field_validator("file_id", mode="before")
    def validate_object_id(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)

    class Config:
        arbitrary_types_allowed = True 