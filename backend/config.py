from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings"""
    
    # Google Gemini Configuration
    gemini_api_key: str = "your_gemini_api_key_here"
    
    # JWT Configuration
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # Database Configuration
    database_url: str = "sqlite:///./mindfulai.db"
    
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    class Config:
        env_file = ".env"
        case_sensitive = False

# Create settings instance
settings = Settings()
