# Highflying Themes API

A FastAPI-based API designed for serverless deployment on Vercel with MongoDB integration.

## Features

- 🔐 JWT-based authentication
- 👤 User registration and login
- 🔒 Password hashing with bcrypt
- 📧 Password reset functionality (placeholder)
- 👤 Profile management
- 🛡️ CORS support for frontend integration
- ☁️ Vercel serverless deployment ready
- 🗄️ MongoDB integration with Motor (async)

## Project Structure

```
backend/
├── index.py              # Main FastAPI application entry point
├── vercel.json           # Vercel configuration
├── pyproject.toml        # Project dependencies
├── env.example           # Environment variables template
├── auth/                 # Authentication module
│   ├── __init__.py
│   ├── models.py         # Pydantic models
│   ├── database.py       # MongoDB operations
│   ├── utils.py          # Authentication utilities
│   └── routes.py         # API routes
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

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API health check |

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
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Protected Endpoint
```bash
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
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

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SECRET_KEY` | JWT signing secret | `your-secret-key-change-in-production` |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Token expiration time | `30` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017` |
| `DATABASE_NAME` | Database name | `highflying_themes` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `*` |

## MongoDB Setup

### Local Development
1. Install MongoDB locally or use Docker
2. Create a database named `highflying_themes`
3. The API will automatically create the `users` collection

### Production (MongoDB Atlas)
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Set `MONGODB_URL` in your environment variables

## Security Considerations

### Production Checklist

- [ ] Change the default `SECRET_KEY` to a strong, random value
- [ ] Configure `ALLOWED_ORIGINS` to only allow your frontend domain
- [ ] Use MongoDB Atlas or a secure MongoDB instance
- [ ] Implement rate limiting
- [ ] Add request validation and sanitization
- [ ] Set up proper logging and monitoring
- [ ] Implement email verification for new accounts
- [ ] Add two-factor authentication (2FA)
- [ ] Set up database indexes for performance

### Current Limitations

- Password reset functionality is a placeholder
- No email verification
- No rate limiting
- No audit logging
- No database indexes (add for production)

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
