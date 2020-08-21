from flask_restplus import Api
from flask import Blueprint

from .main.controller import *
from .main.service import file_service

blueprint = Blueprint('api', __name__)

api = Api(blueprint)

api.add_namespace(status_namespace)
api.add_namespace(auth_namespace)
api.add_namespace(user_namespace)
api.add_namespace(file_namespace)

api.add_namespace(test_namespace)
