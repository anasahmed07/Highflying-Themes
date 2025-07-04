from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from fastapi.responses import StreamingResponse
from typing import Optional
import zipfile
import io
import logging
import base64
from bson import ObjectId

from models.theme import ThemeCreate, ThemeUpdate, ThemeResponse, ThemeListResponse
from models.auth import UserResponse
from database.theme import ( store_file, create_theme, get_theme, get_file, increment_download_count, get_themes, update_theme, delete_theme)
from routes.auth.utils import get_current_user
from utils.smdh_generator import create_smdh_file

logger = logging.getLogger(__name__)

theme_router = APIRouter()

DEFAULT_ICON_BASE64 = """iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAAXNSR0IArs4c6QAAG3JJREFUeF7tnQO05EgXx2u+tW3b9u6szZm1MWvbtmdt27Zt27ZtzXd+dU69U11TSSrdSTqvcu85fXredFJJ3ftP1XX6DBo0aJASEg5EwoE+AuhIJCnT0BwQQAsQouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouKAADoqccpkBNCCgag4IICOSpwyGQG0YCAqDgigoxKnTEYALRiIigMC6KjEKZMRQAsGouJAdID+7rvv1Mcff9wipCGGGELxcel///ufGnLIIXv+m78nnHBCNdRQQ5Ui5L/++ku9/vrrpYxd50FnmWWWym4vOkAfffTRao899mhh4PDDD6+GG264wZg69NBDq5FGGkn16dNH/zb22GOryy+/XE0wwQSlCODDDz9Uk046aSlj13nQQYMGVXZ70QG6f//+6sYbb2yLgbPPPru65ZZb1HjjjdfW+VknCaCzONT571EB+s8//1STTz65+uyzz7ycMSsxP5p///fffz3HLrvssuriiy9WY4wxRuec9YzQRECPNdZY6quvviqFn75BexWg//33X/X999/3zAMwAmIDynfffVetttpqLccsv/zyauSRR9aqBd/mM+KII2rgDxw4UP344496zAEDBqiTTjpJ8VsZ5AKahwq1x6ffc/1//vlHoXf3ZppzzjnV008/XdkUehWgr7nmGnXOOef0MAeA24D++eef1WuvvaaBAAHiL7/80qs/8/sDDzygVl55ZfXDDz/o42ebbTa10EILeQG2wAILqFVWWaUjwbiA5v622WYbNddcc3nH/fvvv/X82qHffvtN8WmHfvrpp7YepMcff1zz1KZV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"""
DEFAULT_ICON_BYTES = base64.b64decode(DEFAULT_ICON_BASE64)


@theme_router.get("/", response_model=ThemeListResponse)
async def list_themes(
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=50, description="Items per page"),
    search: Optional[str] = Query(None, description="Search term"),
    tags: Optional[str] = Query(None, description="Comma-separated tags to filter by"),
    author: Optional[str] = Query(None, description="Filter by author name")
):
    """Get themes with pagination and filtering."""
    try:
        skip = (page - 1) * limit
        tag_list = [tag.strip() for tag in tags.split(",")] if tags else None
        
        result = get_themes(
            skip=skip, 
            limit=limit, 
            search=search, 
            tags=tag_list,
            author=author
        )
        
        return ThemeListResponse(
            themes=result["themes"],
            total=result["total"],
            page=result["page"],
            limit=result["limit"]
        )
    except Exception as e:
        logger.error(f"Error getting themes: {e}")
        raise HTTPException(status_code=500, detail="Failed to get themes")


@theme_router.post("/upload", response_model=ThemeResponse)
async def upload_theme(
    name: str = Form(...),
    short_description: str = Form(...),
    description: str = Form(...),
    tags: str = Form(""),  # Comma-separated tags
    bgm_info: str = Form(""),  # Additional BGM information
    body_LZ_bin: UploadFile = File(..., description="Theme binary file (body_LZ.bin)"),
    bgm_bcstm: UploadFile = File(..., description="Audio file (bgm.bcstm)"),
    preview_png: UploadFile = File(..., description="Preview image (preview.png)"),
    icon_png: UploadFile = File(None, description="Icon image (icon.png) - optional"),
    current_user: UserResponse = Depends(get_current_user)
):
    """Upload a new theme."""
    try:
        # Validate file types
        if not body_LZ_bin.filename.endswith('.bin'):
            raise HTTPException(status_code=400, detail="body_LZ must be a .bin file")
        if not bgm_bcstm.filename.endswith('.bcstm'):
            raise HTTPException(status_code=400, detail="bgm must be a .bcstm file")
        if not preview_png.filename.lower().endswith('.png'):
            raise HTTPException(status_code=400, detail="preview must be a .png file")

        # Parse tags
        tag_list = [tag.strip() for tag in tags.split(",") if tag.strip()] if tags else []

        # Read file contents
        body_lz_content = await body_LZ_bin.read()
        bgm_content = await bgm_bcstm.read()
        preview_content = await preview_png.read()

        # Handle icon: use uploaded or default
        if icon_png is not None:
            icon_content = await icon_png.read()
        else:
            icon_content = DEFAULT_ICON_BYTES

        # Generate SMDH file
        try:
            smdh_content = create_smdh_file(
                theme_name=name,
                author_name=current_user.username,
                short_description=short_description,
                description=description,
                icon_image_data=icon_content
            )
        except Exception as e:
            logger.error(f"Error generating SMDH file: {e}")
            # Fallback to text file if SMDH generation fails
            smdh_content = f"""Theme: {name}
                Author: {current_user.username}
                Description: {short_description}
                Full Description: {description}
                Tags: {', '.join(tag_list)}
                BGM Info: {bgm_info}
                """.encode('utf-8')

        # Create ZIP file in memory
        zip_buffer = io.BytesIO()
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            zip_file.writestr('body_LZ.bin', body_lz_content)
            zip_file.writestr('bgm.bcstm', bgm_content)
            zip_file.writestr('preview.png', preview_content)
            zip_file.writestr('icon.png', icon_content)
            zip_file.writestr('info.smdh', smdh_content)
        
        zip_buffer.seek(0)

        # Store ZIP file in GridFS
        zip_file_id = store_file(zip_buffer.getvalue(), f"{name}.zip", "application/zip")

        # Encode images as base64 for preview
        preview_b64 = base64.b64encode(preview_content).decode('utf-8')
        icon_b64 = base64.b64encode(icon_content).decode('utf-8')

        # Create theme data
        theme_data = ThemeCreate(
            name=name,
            author_name=current_user.username,
            short_description=short_description,
            description=description,
            tags=tag_list
        )

        # Create theme in database
        extra_fields = {
            'preview_b64': preview_b64,
            'icon_b64': icon_b64,
            'bgm_info': bgm_info
        }

        theme = create_theme(
            theme_data=theme_data,
            user_id=current_user.id,
            zip_file_id=str(zip_file_id),
            extra_fields=extra_fields
        )
        return theme

    except Exception as e:
        logger.error(f"Error uploading theme: {e}")
        raise HTTPException(status_code=500, detail="Failed to upload theme")


@theme_router.get("/{theme_id}", response_model=ThemeResponse)
async def get_theme_by_id(theme_id: int):
    theme = get_theme(theme_id)
    if not theme:
        raise HTTPException(status_code=404, detail="Theme not found")
    return theme


@theme_router.get("/download/{id}")
def download_theme_by_id(id: int):
    """Download theme by ID."""
    try:
        # Find theme by integer ID
        theme = get_theme(id)
        if not theme:
            raise HTTPException(status_code=404, detail="Theme not found")
        
        # Get ZIP file from GridFS
        if not theme.zip_file_id:
            raise HTTPException(status_code=404, detail="Theme ZIP file not found")
        
        file_obj = get_file(ObjectId(theme.zip_file_id))
        filename = f"{theme.name or 'theme'} by {theme.author_name or 'switch theme'}.zip"
        
        # Increment download count
        increment_download_count(ObjectId(theme.id))
        
        return StreamingResponse(
            io.BytesIO(file_obj.read()),
            media_type="application/zip",
            headers={
                "Content-Disposition": f"attachment; filename={filename}"
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error downloading theme by int ID: {e}")
        raise HTTPException(status_code=500, detail="Failed to download theme")


# High Priority Routes - Theme Management

@theme_router.put("/{theme_id}", response_model=ThemeResponse)
async def update_theme_by_id(
    theme_id: int,
    theme_data: ThemeUpdate,
    current_user: UserResponse = Depends(get_current_user)
):
    """Update a theme by ID (only theme owner can update)."""
    try:
        # Get the theme first
        theme = get_theme(theme_id)
        if not theme:
            raise HTTPException(status_code=404, detail="Theme not found")
        
        # Check if user owns the theme
        if theme.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="You can only update your own themes")
        
        # Update the theme
        updated_theme = update_theme(ObjectId(theme.id), theme_data)
        if not updated_theme:
            raise HTTPException(status_code=500, detail="Failed to update theme")
        
        return updated_theme
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating theme {theme_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to update theme")


@theme_router.delete("/{theme_id}")
async def delete_theme_by_id(
    theme_id: int,
    current_user: UserResponse = Depends(get_current_user)
):
    """Delete a theme by ID (only theme owner can delete)."""
    try:
        # Get the theme first
        theme = get_theme(theme_id)
        if not theme:
            raise HTTPException(status_code=404, detail="Theme not found")
        
        # Check if user owns the theme
        if theme.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="You can only delete your own themes")
        
        # Delete the theme
        success = delete_theme(ObjectId(theme.id))
        if not success:
            raise HTTPException(status_code=500, detail="Failed to delete theme")
        
        return {"message": "Theme deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting theme {theme_id}: {e}")
        raise HTTPException(status_code=500, detail="Failed to delete theme")

