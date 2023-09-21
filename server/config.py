from os import getenv
from os.path import join, dirname
from dotenv import load_dotenv

load_dotenv(join(dirname(__file__), ".env"))

SQLALCHEMY_DATABASE_URI = "sqlite:///app.db"
JWT_SECRET_KEY = getenv("JWT_SECRET_KEY")
