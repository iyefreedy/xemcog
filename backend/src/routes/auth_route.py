from flask import request, Blueprint, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, current_user
from src.models.user import User
from src.validator import CustomValidator
from src.validator.auth_validator import login_schema

auth_blueprint = Blueprint('auth', __name__)


@auth_blueprint.post('/login')
def attempt_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    validator = CustomValidator(login_schema)
    if not validator.validate(data):
        error = next(iter(validator.errors))
        return jsonify(error=validator.errors[error][0]), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(user)
        response = jsonify(message="Login successful")
        set_access_cookies(response, access_token)

        return response, 200
    else:
        return jsonify({"message": "Invalid credential"}), 404


@auth_blueprint.get('/authenticate')
@jwt_required(verify_type=False, skip_revocation_check=True)
def authenticate():
    return jsonify(current_user.serialize())
