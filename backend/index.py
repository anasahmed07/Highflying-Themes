import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router      # Import routers
from routes.auth import auth_router
from routes.contact import contact_router
from routes.theme import theme_router
import dotenv


dotenv.load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Switch Theme API",
    description="API for Switch Theme platform",
    version="1.0.0",
    swagger_ui_parameters={"defaultModelsExpandDepth": -1},
    redoc_url=None
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS").split(","),  # Use environment variable
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Include routers
app.include_router(router, prefix="", tags=["root"])
app.include_router(auth_router, prefix="/auth", tags=["authentication"])
app.include_router(contact_router, prefix="/contact", tags=["contact"])
app.include_router(theme_router, prefix="/themes", tags=["themes"])

# For Vercel serverless deployment
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True) 