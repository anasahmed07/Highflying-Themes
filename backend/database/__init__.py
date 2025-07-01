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
    "update_contact_message_status"
] 