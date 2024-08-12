import os
import sys
from flask import Flask, send_from_directory
from src.extensions import db, migrate, jwt, cors
from src.routes import api_blueprint


app = Flask(__name__)
app.config.from_object("src.config.Config")

with app.app_context():
    app.json.sort_keys = False

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    app.register_blueprint(api_blueprint)
    print(app.url_map, file=sys.stderr)
    print(app.static_folder, file=sys.stderr)
    print(app.static_url_path, file=sys.stderr)
