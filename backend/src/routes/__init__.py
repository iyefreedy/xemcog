from flask import Blueprint
from .auth_route import auth_blueprint
from .user_route import user_blueprint
from .session_route import session_blueprint
from .stimuli_route import stimuli_blueprint
from .response_route import response_blueprint

api_blueprint = Blueprint('api', __name__, url_prefix='/api')

api_blueprint.register_blueprint(auth_blueprint)
api_blueprint.register_blueprint(user_blueprint)
api_blueprint.register_blueprint(session_blueprint)
api_blueprint.register_blueprint(stimuli_blueprint)
api_blueprint.register_blueprint(response_blueprint)
