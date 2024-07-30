import os
import sys
from flask import Blueprint, jsonify, request
from flask_jwt_extended import current_user, jwt_required
from src.models.response import Response
from werkzeug.utils import secure_filename
from src.config import UPLOAD_FOLDER
from src.extensions import db

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

response_blueprint = Blueprint('response', __name__, url_prefix='/responses')


@response_blueprint.post('/')
@jwt_required()
def save_response():
    try:
        if 'interpretation_image_path' not in request.files:
            return jsonify(message="Image not found"), 400
        file = request.files['interpretation_image_path']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return jsonify(message="Image not found"), 400

        data = request.form
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print(os.path.join(UPLOAD_FOLDER, filename), file=sys.stderr)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

            new_response = Response(
                session_id=data.get('session_id'),
                interpretation_image_path=filename,
                response_time=data.get('response_time'),
                word=data.get('word')
            )
            db.session.add(new_response)
            db.session.commit()
            return jsonify(message="Response created"), 201
        return jsonify(message="Create response failed"), 404
    except Exception as e:
        db.session.rollback()
        return jsonify(message=str(e))
    finally:
        db.session.close()


def allowed_file(filename: str):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
