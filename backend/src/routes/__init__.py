from flask import Blueprint
from .auth_route import auth_blueprint
from .user_route import user_blueprint

api_blueprint = Blueprint('api', __name__, url_prefix='/api')

api_blueprint.register_blueprint(auth_blueprint)
api_blueprint.register_blueprint(user_blueprint)
