from flask import request
from flask_restplus import Resource
from flask_restplus import Namespace

from ..service.auth_service import Auth
from ..util.decorator import login_required

from .api_fields import *


api = Namespace(
    name='auth',
    path='/auth',
    description='authentication related operations'
)
user_auth = api.model(
    name='auth_details',
    model={email, password}
)
auth_response = api.model(
    name='auth_response',
    model={response_status, response_message, auth_token}
)
auth_token = api.model(
    name='bearer_auth_token',
    model={bearer_auth_token}
)
auth_token_header = api.parser()
auth_token_header.add_argument('Authorization', type=str, location='headers')


@api.route('/login')
class UserLogin(Resource):
    """
    User Login Resource
    """

    @api.doc('new_user login')
    @api.expect(user_auth, validate=True)
    @api.marshal_with(auth_response)
    def post(self):
        # TODO Validation
        return Auth.login_user(data=request.json)


@api.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @api.doc('logout a new_user')
    @api.marshal_with(auth_response)
    @api.expect(auth_token_header)
    @login_required
    def post(self):
        # TODO Validation
        bearer_auth_token = request.headers.get('Authorization')

        return Auth.logout_user(bearer_auth_token=bearer_auth_token)


@api.route('/check_token')
class CheckToken(Resource):
    """
    Check bearer_auth_token
    """

    @api.doc('check a auth_token')
    # @api.marshal_with(auth_response)
    @api.expect(auth_token, validate=True)
    def get(self):
        # TODO Validation
        bearer_auth_token = request.json['bearer_auth_token']

        return Auth.decode_auth_token(bearer_auth_token=bearer_auth_token)
