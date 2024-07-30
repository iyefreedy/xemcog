import datetime
from flask import Blueprint, jsonify
from flask_jwt_extended import current_user, jwt_required
from src.models.session import Session
from src.extensions import db

session_blueprint = Blueprint('session', __name__, url_prefix='/sessions')


@session_blueprint.post('/')
@jwt_required()
def create_session():

    try:
        max_session_number = db.session.query(db.func.ifnull(db.func.max(
            Session.session_number), 0)).where(Session.user_id == current_user.id).scalar()
        new_session = Session(user_id=current_user.id,
                              session_number=max_session_number + 1)
        db.session.add(new_session)
        db.session.commit()

        return jsonify(new_session.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()
