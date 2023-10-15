from os import getenv
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(join(dirname(__file__), ".env"))

SQLALCHEMY_DATABASE_URI = "sqlite:///app.sqlite"
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
JWT_TOKEN_LOCATION = ["cookies"]
CORS_ORIGINS = ["http://127.0.0.1:5173"]
CORS_METHODS = ["GET", "POST", "PUT", "DELETE"]
CORS_SUPPORTS_CREDENTIALS = True
