from flask import Blueprint, jsonify

experiment_blueprint = Blueprint('experiment', __name__, url_prefix='/experiments')