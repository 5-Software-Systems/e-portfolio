from flask_restplus import Api
from flask import Blueprint

from .main.controller import auth_namespace, user_namespace, test_namespace

blueprint = Blueprint('api', __name__)

api = Api(blueprint)

api.add_namespace(user_namespace, path='/user')
api.add_namespace(auth_namespace, path='/auth')
api.add_namespace(test_namespace, path='/test')
