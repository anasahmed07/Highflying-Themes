from bson import ObjectId
from typing import List, Optional, Dict, Any
import logging
from datetime import datetime
from .connection import get_database, get_fs
from models.theme import ThemeCreate, ThemeUpdate, ThemeResponse

logger = logging.getLogger(__name__)


def create_theme(theme_data: ThemeCreate, user_id: str, zip_file_id: str, extra_fields: dict = None) -> ThemeResponse:
    """Create a new theme with ZIP file reference and extra fields."""
    try:
        db = get_database()
        themes_collection = db.themes
        # Assign incrementing theme_id
        last_theme = themes_collection.find_one(sort=[('theme_id', -1)])
        next_theme_id = 1 if not last_theme else last_theme['theme_id'] + 1
        
        theme_doc = {
            "theme_id": next_theme_id,
            "name": theme_data.name,
            "author_name": theme_data.author_name,
            "short_description": theme_data.short_description,
            "description": theme_data.description,
            "tags": theme_data.tags,
            "user_id": user_id,
            "zip_file_id": zip_file_id,
            "download_count": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        if extra_fields:
            theme_doc.update(extra_fields)
        result = themes_collection.insert_one(theme_doc)
        theme_doc["_id"] = str(result.inserted_id)
        return ThemeResponse(**theme_doc)
    except Exception as e:
        logger.error(f"Error creating theme: {e}")
        raise


def get_theme_by_id(theme_id: ObjectId) -> Optional[ThemeResponse]:
    """Get theme by ID."""
    try:
        db = get_database()
        themes_collection = db.themes
        theme_doc = themes_collection.find_one({"_id": theme_id})
        if theme_doc:
            theme_doc["_id"] = str(theme_doc["_id"])
            return ThemeResponse(**theme_doc)
        return None
    except Exception as e:
        logger.error(f"Error getting theme by ID: {e}")
        raise


def get_themes(skip: int = 0, limit: int = 10, search: Optional[str] = None, tags: Optional[List[str]] = None, author: Optional[str] = None) -> Dict[str, Any]:
    """Get themes with pagination and filtering."""
    try:
        db = get_database()
        themes_collection = db.themes
        query = {}
        
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"author_name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"tags": {"$in": [search]}}
            ]
        
        if tags:
            query["tags"] = {"$in": tags}
        
        if author:
            query["author_name"] = {"$regex": author, "$options": "i"}
        
        total = themes_collection.count_documents(query)
        themes = list(themes_collection.find(query).skip(skip).limit(limit).sort("created_at", -1))
        for theme in themes:
            theme["_id"] = str(theme["_id"])
        return {
            "themes": [ThemeResponse(**theme) for theme in themes],
            "total": total,
            "page": skip // limit + 1,
            "limit": limit
        }
    except Exception as e:
        logger.error(f"Error getting themes: {e}")
        raise


def get_themes_by_user(user_id: str) -> List[ThemeResponse]:
    """Get all themes by a specific user."""
    try:
        db = get_database()
        themes_collection = db.themes
        themes = list(themes_collection.find({"user_id": user_id}).sort("created_at", -1))
        for theme in themes:
            theme["_id"] = str(theme["_id"])
        return [ThemeResponse(**theme) for theme in themes]
    except Exception as e:
        logger.error(f"Error getting themes by user: {e}")
        raise


def update_theme(theme_id: ObjectId, theme_data: ThemeUpdate) -> Optional[ThemeResponse]:
    """Update theme information."""
    try:
        db = get_database()
        themes_collection = db.themes
        update_data = {k: v for k, v in theme_data.dict(exclude_unset=True).items()}
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            result = themes_collection.update_one(
                {"_id": theme_id},
                {"$set": update_data}
            )
            if result.modified_count > 0:
                return get_theme_by_id(theme_id)
        return None
    except Exception as e:
        logger.error(f"Error updating theme: {e}")
        raise


def delete_theme(theme_id: ObjectId) -> bool:
    """Delete theme and ZIP file."""
    try:
        db = get_database()
        themes_collection = db.themes
        fs = get_fs(db)
        # Get theme to find ZIP file ID
        theme = get_theme_by_id(theme_id)
        if not theme:
            return False
        # Delete ZIP file from GridFS
        try:
            fs.delete(ObjectId(theme.zip_file_id))
        except Exception as e:
            logger.warning(f"Could not delete ZIP file {theme.zip_file_id}: {e}")
        # Delete theme document
        result = themes_collection.delete_one({"_id": theme_id})
        return result.deleted_count > 0
    except Exception as e:
        logger.error(f"Error deleting theme: {e}")
        raise


def increment_download_count(theme_id: ObjectId) -> bool:
    """Increment download count for a theme."""
    try:
        db = get_database()
        themes_collection = db.themes
        result = themes_collection.update_one(
            {"_id": theme_id},
            {"$inc": {"download_count": 1}}
        )
        return result.modified_count > 0
    except Exception as e:
        logger.error(f"Error incrementing download count: {e}")
        raise


def store_file(file_data: bytes, filename: str, content_type: str = "application/octet-stream") -> ObjectId:
    """Store a file in GridFS."""
    try:
        db = get_database()
        fs = get_fs(db)
        file_id = fs.put(file_data, filename=filename, content_type=content_type)
        return file_id
    except Exception as e:
        logger.error(f"Error storing file {filename}: {e}")
        raise


def get_file(file_id: ObjectId):
    """Get a file from GridFS."""
    try:
        db = get_database()
        fs = get_fs(db)
        return fs.get(file_id)
    except Exception as e:
        logger.error(f"Error getting file {file_id}: {e}")
        raise


def delete_file(file_id: ObjectId) -> bool:
    """Delete a file from GridFS."""
    try:
        db = get_database()
        fs = get_fs(db)
        fs.delete(file_id)
        return True
    except Exception as e:
        logger.error(f"Error deleting file {file_id}: {e}")
        raise


def get_file_info(file_id: ObjectId) -> Optional[Dict[str, Any]]:
    """Get file information from GridFS."""
    try:
        db = get_database()
        fs = get_fs(db)
        file_info = fs.get(file_id)
        return {
            "filename": file_info.filename,
            "content_type": file_info.content_type,
            "size": file_info.length,
            "upload_date": file_info.upload_date
        }
    except Exception as e:
        logger.error(f"Error getting file info {file_id}: {e}")
        return None


def get_theme(theme_id: int) -> Optional[ThemeResponse]:
    """Get theme by integer ID."""
    try:
        db = get_database()
        themes_collection = db.themes
        theme_doc = themes_collection.find_one({"theme_id": theme_id})
        if theme_doc:
            theme_doc["_id"] = str(theme_doc["_id"])
            return ThemeResponse(**theme_doc)
        return None
    except Exception as e:
        logger.error(f"Error getting theme by int ID: {e}")
        raise


def get_current_time():
    """Get current UTC time."""
    return datetime.utcnow()


def get_popular_themes(limit: int = 10) -> List[ThemeResponse]:
    """Get most downloaded themes."""
    try:
        db = get_database()
        themes_collection = db.themes
        themes = list(themes_collection.find().sort("download_count", -1).limit(limit))
        for theme in themes:
            theme["_id"] = str(theme["_id"])
        return [ThemeResponse(**theme) for theme in themes]
    except Exception as e:
        logger.error(f"Error getting popular themes: {e}")
        raise


def get_recent_themes(limit: int = 10) -> List[ThemeResponse]:
    """Get recently uploaded themes."""
    try:
        db = get_database()
        themes_collection = db.themes
        themes = list(themes_collection.find().sort("created_at", -1).limit(limit))
        for theme in themes:
            theme["_id"] = str(theme["_id"])
        return [ThemeResponse(**theme) for theme in themes]
    except Exception as e:
        logger.error(f"Error getting recent themes: {e}")
        raise


def get_all_tags() -> List[str]:
    """Get all available tags."""
    try:
        db = get_database()
        themes_collection = db.themes
        pipeline = [
            {"$unwind": "$tags"},
            {"$group": {"_id": "$tags", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$project": {"tag": "$_id", "_id": 0}}
        ]
        tags = list(themes_collection.aggregate(pipeline))
        return [tag["tag"] for tag in tags]
    except Exception as e:
        logger.error(f"Error getting all tags: {e}")
        raise 