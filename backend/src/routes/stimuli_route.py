import random

from flask import jsonify, Blueprint
from flask_jwt_extended import jwt_required

from src.extensions import db, generate_derivatives

stimuli_blueprint = Blueprint('stimuli', __name__, url_prefix='/stimulis')


@stimuli_blueprint.get('/')
@jwt_required()
def get_stimulis():
    stimuli = ["batas", "cepat", "tumbuh"]
    prefixes = ["me", "per", "ber", "ter"]
    suffixes = ["an", "i", "kan"]
    return jsonify(generate_derivatives(random.choice(stimuli), prefixes, suffixes))


@stimuli_blueprint.post('/')
@jwt_required()
def create_stimuli():
    pass
