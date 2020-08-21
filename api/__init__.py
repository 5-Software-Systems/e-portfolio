from flask_restplus import Api
from flask import Blueprint

from .main.controller import *
from .main.service import file_service
from .main.util.exception import ServerError

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
