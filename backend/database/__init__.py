# Unified database module

# Connection
from .connection import connect_to_mongo, close_mongo_connection, get_database, test_connection

# Auth operations
from .auth import (
    get_user_by_email,
    get_user_by_username,
    create_user,
    update_user,
    soft_delete_user,
    hard_delete_user,
    get_user_by_id,
    update_user_profile,
    add_token_to_blacklist,
    is_token_blacklisted,
    blacklist_user_tokens,
    cleanup_expired_tokens,
    get_deactivated_user_by_email,
    get_deactivated_user_by_username
)

# Contact operations
from .contact import (
    create_contact_message,
    get_contact_messages,
    get_contact_message_by_id,
    update_contact_message_status
)

# Theme operations
from .theme import (
    create_theme,
    get_theme_by_id,
    get_themes,
    get_themes_by_user,
    update_theme,
    delete_theme,
    increment_download_count,
    store_file,
    get_file,
    delete_file,
    get_file_info,
    get_theme,
    get_current_time,
    get_popular_themes,
    get_recent_themes,
    get_all_tags
)

__all__ = [
    # Connection
    "connect_to_mongo",
    "close_mongo_connection", 
    "get_database",
    "test_connection",
    # Auth operations
    "get_user_by_email",
    "create_user",
    "update_user",
    "soft_delete_user",
    "hard_delete_user",
    "get_user_by_id",
    "update_user_profile",
    "add_token_to_blacklist",
    "is_token_blacklisted",
    "blacklist_user_tokens",
    "cleanup_expired_tokens",
    "get_deactivated_user_by_email",
    "get_deactivated_user_by_username",
    # Contact operations
    "create_contact_message",
    "get_contact_messages",
    "get_contact_message_by_id",
    "update_contact_message_status",
    # Theme operations
    "create_theme",
    "get_theme_by_id",
    "get_themes",
    "get_themes_by_user",
    "update_theme",
    "delete_theme",
    "increment_download_count",
    "store_file",
    "get_file",
    "delete_file",
    "get_file_info",
    "get_theme",
    "get_current_time",
    "get_popular_themes",
    "get_recent_themes",
    "get_all_tags"
] 