import json
import sys

from flask_restplus import Api
from flask import Blueprint, current_app

from .main import db, flask_bcrypt
from .main.controller import namespaces
from .main.service import file_service
from .main.util.exception import ServerError

blueprint = Blueprint('api', __name__)

api = Api(blueprint)

for namespace in namespaces:
    api.add_namespace(namespace)


@api.errorhandler
def handle_server_error(e: ServerError):
    err = {
        'error': e.__class__.__name__,
        'message': e.error_message,
    }
    if current_app.config['DEBUG']:
        print(type(e), json.dumps(err, indent=2), file=sys.stderr)
    return err, e.status_code
