from flask import request
from flask_restplus import Resource, Namespace

from ..service import auth_service
from ..util.decorator import *

from . import api_model

namespace = Namespace(
    name='auth',
    path='/',
    description='authentication related operations'
)


@namespace.route('/auth/login')
class UserLogin(Resource):

    @namespace.expect(api_model.user_auth, validate=True)
    @namespace.marshal_with(api_model.auth_response)
    def post(self):
        """
        Log in a user
        """
        data = request.json
        return auth_service.login_user(data=data), 200


@namespace.route('/auth/logout')
class LogoutAPI(Resource):

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.auth_response)
    def post(self):
        """
        Log out a user
        """
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.logout_token(bearer_auth_token=bearer_auth_token), 200


@namespace.route('/auth/user')
class CheckToken(Resource):

    @namespace.marshal_with(api_model.user_basic)
    @namespace.expect(api_model.auth_token_header)
    def get(self):
        """
        Get the currently logged in user
        """
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.get_user_from_token(bearer_auth_token), 200


@namespace.route('/auth/password_forgot')
class Forgot(Resource):

    @namespace.expect(api_model.user_email)
    @namespace.marshal_with(api_model.link_response)
    def post(self):
        """
        Request a password reset email
        """
        data = request.json
        return auth_service.forgot_password(data), 200


@namespace.route('/user/<user_public_id>/password_reset')
@namespace.param('user_public_id', 'The User identifier')
class Reset(Resource):

    @namespace.expect(api_model.auth_token_header, api_model.pw_reset, validate=True)
    @namespace.marshal_with(api_model.response)
    @reset_or_login_token_required
    def post(self, user_public_id):
        """
        Change password
        """
        data = request.json

        bearer_auth_token = request.headers.get('Authorization')
        auth_service.logout_token(bearer_auth_token=bearer_auth_token)

        return auth_service.reset_password(data), 200


@namespace.route('/user/<user_public_id>/verify')
@namespace.param('user_public_id', 'The User identifier')
class Forgot(Resource):

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.response)
    @verify_token_required
    def post(self, user_public_id):
        """
        Verify account
        """
        bearer_auth_token = request.headers.get('Authorization')
        auth_service.logout_token(bearer_auth_token=bearer_auth_token)

        return auth_service.verify_account(user_public_id), 200
