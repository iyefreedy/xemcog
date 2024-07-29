from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS


with open("secrets/private.pem") as f:
    private_key = f.read()

with open("secrets/public.pem") as f:
    public_key = f.read()

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS(
    resources={r"/api/*": {"origins": "http://localhost:5173", "supports_credentials": True}}, supports_credentials=True)


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    from src.models.user import User

    identity = jwt_data["sub"]
    return User.query.filter(User.id == identity).one_or_none()
