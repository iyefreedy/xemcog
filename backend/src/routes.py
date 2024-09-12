import os
import sys
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, set_access_cookies, jwt_required, current_user
from werkzeug.utils import secure_filename
from src.models import User, Session, Drawing, Rating, Experiment, Input, Sentence
from src.schema import login_schema, CustomValidator
from src.extensions import db

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../static/images/drawings')

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.post('/login')
def attempt_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    validator = CustomValidator(login_schema)
    if not validator.validate(data):
        error = next(iter(validator.errors))
        return jsonify(message=validator.errors[error][0]), 400

    user: User = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(user)
        response = jsonify(message="Login successful")
        set_access_cookies(response, access_token)

        return response, 200
    else:
        return jsonify({"message": "Invalid credential"}), 401


@api_blueprint.get('/authenticate')
@jwt_required()
def authenticate():
    return current_user.serialize(), 200


@api_blueprint.get('/experiments')
@jwt_required()
def get_experiments():
    experiments = Experiment.query.all()
    return jsonify([experiment.serialize() for experiment in experiments])


@api_blueprint.get('/experiments/<experiment_id>')
@jwt_required()
def get_experiment(experiment_id):
    experiment = Experiment.query.filter_by(
        experiment_id=experiment_id).first()
    return experiment.serialize()


@api_blueprint.post('/experiments')
@jwt_required()
def start_experiment():
    data: dict = request.get_json()
    try:
        new_experiment = Experiment(
            user_id=data.get('user_id'),
            start_time=datetime.fromisoformat(
                data.get('start_time').replace('Z', '+00:00'))
        )
        db.session.add(new_experiment)
        db.session.commit()

        return new_experiment.serialize(), 201
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"message": "Failed to start experiment"}), 500


@api_blueprint.put('/experiments/<experiment_id>')
@jwt_required()
def end_experiment(experiment_id):
    data: dict = request.get_json()
    try:
        experiment: Experiment = Experiment.query.filter_by(
            id=experiment_id).first()
        experiment.end_time = datetime.fromisoformat(
            data.get('end_time').replace('Z', '+00:00'))
        db.session.commit()
        return experiment.serialize(), 200
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"message": "Failed to end experiment"}), 500


@api_blueprint.post('/sessions')
@jwt_required()
def create_session():
    data: dict = request.get_json()
    try:
        new_session = Session(
            experiment_id=data.get('experiment_id'),
            stimuli_id=data.get('stimuli_id'),
            start_time=datetime.fromisoformat(
                data.get('start_time').replace('Z', '+00:00'))
        )
        db.session.add(new_session)
        db.session.commit()

        return new_session.serialize(), 201
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"message": "Failed to start session"}), 500


@api_blueprint.put('/sessions/<session_id>')
@jwt_required()
def end_session(session_id):
    data: dict = request.get_json()
    try:
        session: Session = Session.query.filter_by(
            session_id=session_id).first()
        session.end_time = datetime.fromisoformat(
            data.get('end_time').replace('Z', '+00:00'))
        db.session.commit()
        return session.serialize(), 200
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({"message": "Failed to end session"}), 500


@api_blueprint.post("/drawings")
@jwt_required()
def create_drawing():
    try:
        if 'image' not in request.files:
            return jsonify(message="Image not found"), 400
        file = request.files['image']

        if file.filename == '':
            return jsonify(message="Image not found"), 400

        data = request.form
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(os.path.join(UPLOAD_FOLDER, filename), file=sys.stderr)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

            new_drawing = Drawing(
                session_id=data.get('session_id'),
                image_path=filename,
            )
            db.session.add(new_drawing)
            db.session.commit()
            return jsonify(message="Resource created", data=new_drawing.serialize()), 201
        return jsonify(message="Failed"), 404
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500


@api_blueprint.post('/ratings')
@jwt_required()
def create_rating():
    try:
        data: dict = request.get_json()
        new_rating = Rating(
            session_id=data.get('session_id'),
            rate=data.get('rate'),
        )
        db.session.add(new_rating)
        db.session.commit()
        return jsonify(message="Resource created", data=new_rating.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()


@api_blueprint.post('/sentences')
@jwt_required()
def create_sentence():
    try:
        data: dict = request.get_json()
        new_sentence = Sentence(
            session_id=data.get('session_id'),
            inputted_sentence=data.get('sentence'),
            start_time=datetime.fromisoformat(
                data.get('start_time').replace('Z', '+00:00')),
            end_time=datetime.fromisoformat(
                data.get('end_time').replace('Z', '+00:00'))
        )
        db.session.add(new_sentence)
        db.session.commit()
        return jsonify(message="Resource created", data=new_sentence.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()


@api_blueprint.post('/inputs')
@jwt_required()
def create_input():
    try:
        data: dict = request.get_json()
        new_input = Input(
            session_id=data.get('session_id'),
            inputted_word=data.get('input'),
            start_time=datetime.fromisoformat(
                data.get('start_time').replace('Z', '+00:00')),
            end_time=datetime.fromisoformat(
                data.get('end_time').replace('Z', '+00:00'))
        )
        db.session.add(new_input)
        db.session.commit()
        return jsonify(message="Resource created", data=new_input.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e)), 500
    finally:
        db.session.close()


def allowed_file(filename: str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
