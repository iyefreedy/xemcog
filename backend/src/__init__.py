from dotenv import load_dotenv
from flask import Flask
from werkzeug.exceptions import NotFound, Unauthorized
from src.extensions import db, migrate, jwt, cors

load_dotenv()

app = Flask(__name__)
app.config.from_object("src.config.Config")


with app.app_context():
    app.json.sort_keys = False

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    from src.routes import api_blueprint

    app.register_blueprint(api_blueprint)


@app.errorhandler(404)
def page_not_found(error: NotFound):
    return {"message": error.description}, 404


@app.errorhandler(401)
def page_not_found(error: Unauthorized):
    return {"message": error.description}, 401
