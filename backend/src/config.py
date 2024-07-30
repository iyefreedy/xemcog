import os
from src.extensions import private_key, public_key
from sqlalchemy import URL

UPLOAD_FOLDER = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../static/images/responses')


DATABASE_URI = URL.create(
    drivername="mysql",
    host=os.environ.get("DB_HOST", "localhost"),
    port=os.environ.get("DB_PORT", 3306),
    username=os.environ.get("DB_USER", "root"),
    password=os.environ.get("DB_PASS", ""),
    database=os.environ.get("DB_NAME", "xemcog"),
)


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = DATABASE_URI
    JWT_PRIVATE_KEY = private_key
    JWT_PUBLIC_KEY = public_key
    JWT_ACCESS_TOKEN_EXPIRES = 3600
    JWT_ALGORITHM = "RS256"
    JWT_TOKEN_LOCATION = "cookies"
    JWT_ERROR_MESSAGE_KEY = "message"
    JWT_COOKIE_CSRF_PROTECT = True
