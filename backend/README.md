# Switch Theme API

A FastAPI-based API designed for serverless deployment on Vercel with MongoDB integration.

## Features

- 🔑 JWT-based authentication
- 👤 User registration and login
- 🔒 Password hashing with bcrypt
- 📧 Password reset functionality (placeholder)
- 👤 Profile management
- 🛡️ CORS support for frontend integration
- ☁️ Vercel serverless deployment ready
- 📄 MongoDB integration with **pymongo** (synchronous)
- 📝 Pydantic models for request/response validation
- 🪵 Structured logging and error handling

## Project Structure

```
backend/
├── index.py              # Main FastAPI application entry point
├── vercel.json           # Vercel configuration
├── pyproject.toml        # Project dependencies
├── env.example           # Environment variables template
├── database/             # Database connection and CRUD logic
│   ├── connection.py     # MongoDB connection (pymongo)
│   ├── auth.py           # User CRUD and token blacklist
│   ├── contact.py        # Contact message CRUD
│   └── ...
├── models/               # Pydantic models for validation (not DB models)
│   ├── auth.py           # User, token, and profile schemas
│   ├── contact.py        # Contact message schemas
│   └── ...
├── routes/               # FastAPI routers
│   ├── auth/             # Auth endpoints
│   ├── contact/          # Contact endpoints
│   └── health_check/     # Health check endpoint
└── README.md
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | Login and get access token |
| `GET` | `/auth/profile` | Get current user profile |
| `PUT` | `/auth/profile` | Update user profile |
| `POST` | `/auth/change-password` | Change user password |
| `POST` | `/auth/reset-password` | Request password reset |
| `DELETE` | `/auth/delete-account` | Delete user account |
| `GET` | `/auth/verify-token` | Verify JWT token validity |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contact/submit` | Submit a contact message |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |
| `GET` | `/test-db` | Test database connection |

## Request/Response Examples

### User Registration
```bash
POST /auth/signup
Content-Type: application/json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}
```

### User Login
```bash
POST /auth/login
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
Response:
```json
{
  "access_token": "...",
  "token_type": "bearer"
}
```

### Protected Endpoint
```bash
GET /auth/profile
Authorization: Bearer <token>
```

## Local Development

### Prerequisites
- Python 3.13+
- MongoDB (local or cloud)
- uv (recommended) or pip

### Installation
1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   uv sync
   # or
   pip install -r requirements.txt
   ```
4. Set up environment variables:
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```
5. Start MongoDB (if using local):
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   # Or install MongoDB locally
   ```
6. Run the development server:
   ```bash
   python index.py
   ```
The API will be available at `http://localhost:8000`

### API Documentation
Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Vercel Deployment

### Prerequisites
- Vercel account
- Vercel CLI installed
- MongoDB Atlas account (recommended for production)

### Deployment Steps
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Login to Vercel:
   ```bash
   vercel login
   ```
3. Deploy from the backend directory:
   ```bash
   cd backend
   vercel
   ```
4. Set environment variables in Vercel dashboard:
   - `SECRET_KEY`: Your secret key for JWT signing
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: Token expiration time (default: 30)
   - `MONGODB_URL`: Your MongoDB connection string
   - `DATABASE_NAME`: Your database name
   - `ALLOWED_ORIGINS`: CORS allowed origins

## Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | JWT signing secret | `your-secret-key-change-in-production` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Database name | `switch_theme` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `*` |

## MongoDB Setup

### Local Development
1. Install MongoDB locally or use Docker
2. Create a database named `switch_theme`
3. The API will automatically create the `users` and `contact_messages` collections

### Production (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Set `MONGODB_URL` in your environment variables

## Models Directory

- The `models/` directory contains **Pydantic models** for request/response validation.
- These are used in route handlers to validate and document API data.
- They are not database models or schemas.

## Logging & Error Handling

- The backend uses Python's `logging` module for structured logs.
- Only high-level INFO logs and all ERROR/WARNING logs are kept by default.
- All database operations are wrapped in try/except blocks for robust error handling.

## Troubleshooting

### bcrypt/passlib AttributeError
If you see an error like:
```
AttributeError: module 'bcrypt' has no attribute '__about__'
```
- Upgrade both `bcrypt` and `passlib` to the latest versions:
  ```bash
  pip install --upgrade bcrypt passlib
  ```
- If the error persists, try downgrading `bcrypt` to version 4.0.1:
  ```bash
  pip install 'bcrypt==4.0.1'
  ```
- This warning is usually harmless if password hashing/verification still works.

## Security Considerations

- Change the default `SECRET_KEY` to a strong, random value before deploying to production.
- Use environment variables for all secrets and database credentials.

## Adding New Modules

To add new functionality (e.g., themes, uploads):

1. Create a new directory (e.g., `themes/`)
2. Add `__init__.py`, `models.py`, `database.py`, `utils.py`, `routes.py`
3. Import and include the router in `index.py`

Example:
```python
# In index.py
from themes.routes import themes_router
app.include_router(themes_router, prefix="/themes", tags=["themes"])
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.
