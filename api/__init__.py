from flask_restplus import Api
from flask import Blueprint, render_template

from .main.controller import *
from .main.service import file_service
from .main.util.exception import ServerError
from .main import create_app, db

blueprint = Blueprint('api', __name__)

api = Api(blueprint)

api.add_namespace(status_namespace)
api.add_namespace(auth_namespace)
api.add_namespace(user_namespace)
api.add_namespace(file_namespace)

api.add_namespace(test_namespace)


@api.errorhandler
def handle_server_error(e: ServerError):
    return {
        'error': e.__class__.__name__,
        'message': e.error_message,
    }, e.status_code


def build_app():
    app = create_app()
    app.register_blueprint(blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html', token='Hello World')

    with app.app_context():
        db.create_all()

    return app