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


def generate_derivatives(base_word: str, prefixes: list, suffixes: list):
    derivatives = []

    # Tambahkan kata dasar itu sendiri
    derivatives.append(base_word)

    # Tambahkan kata dengan awalan
    for prefix in prefixes:
        if base_word[0] == 'b' and prefix == 'me':
            derivatives.append(prefix + 'm' + base_word + 'i')
        else:
            derivatives.append(prefix + base_word)

    # Tambahkan kata dengan akhiran
    for suffix in suffixes:
        derivatives.append(base_word + suffix)

    # Tambahkan kata dengan kombinasi awalan dan akhiran
    for prefix in prefixes:
        for suffix in suffixes:
            derivatives.append(prefix + base_word + suffix)

    return derivatives
