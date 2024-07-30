import sys
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, current_user
from src.validator import CustomValidator
from src.validator.user_validator import create_user_schema
from src.models.user import User
from src.middleware.admin_required import admin_required
from src.extensions import db

user_blueprint = Blueprint('user', __name__, url_prefix='/users')


@user_blueprint.get('/me')
@jwt_required()
def get_current_user():
    return current_user.serialize()

@user_blueprint.get('/')
@jwt_required()
@admin_required()
def get_users():
    try:
        users = User.query.all()
        db.session.commit()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()



@user_blueprint.post('/')
@jwt_required(verify_type=False, skip_revocation_check=True)
@admin_required()
def create_user():
    data: dict = request.get_json()
    fullname = data.get('fullname')
    email = data.get('email')
    password = data.get('password')

    try:

        validator = CustomValidator(create_user_schema)
        if not validator.validate(data):
            error = next(iter(validator.errors))
            return jsonify(message=validator.errors[error][0]), 400

        existing_user = User.query.filter_by(email=email).first()
        if existing_user is not None:
            return jsonify(message="Email already in used"), 409

        user = User(fullname=fullname, email=email,
                    password_hash=password, is_admin=True)
        db.session.add(user)
        db.session.commit()

        return jsonify(message="Register successful"), 201
    except Exception as e:
        db.session.rollback()
        print(type(e).__name__, file=sys.stderr)
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()
