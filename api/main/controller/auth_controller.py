from flask import request
from flask_restplus import Resource, Namespace

from ..service import auth_service
from ..util.decorator import login_token_required, reset_or_login_token_required, verify_token_required

from . import api_model

namespace = Namespace(
    name='auth',
    path='/auth',
    description='authentication related operations'
)


@namespace.route('/login')
class UserLogin(Resource):
    """
    User Login Resource
    """

    @namespace.expect(api_model.user_auth, validate=True)
    @namespace.marshal_with(api_model.auth_response)
    def post(self):
        """
        Log in a user
        """
        data = request.json
        return auth_service.login_user(data=data), 200


@namespace.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.auth_response)
    @login_token_required
    def post(self):
        """
        Log out a user
        """
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.logout_user(bearer_auth_token=bearer_auth_token), 200


@namespace.route('/user')
class CheckToken(Resource):
    """
    Check bearer_auth_token
    """

    @namespace.marshal_with(api_model.user_basic)
    @namespace.expect(api_model.auth_token_header)
    def get(self):
        """
        Get the currently logged in user
        """
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.get_user_from_token(bearer_auth_token), 200


@namespace.route('/reset')
class OldReset(Resource):

    def post(self):
        """
        DEPRECATED
        """
        return 'deprecated method, use /auth/password_forgot', 301

    def put(self):
        """
        DEPRECATED
        """
        return 'deprecated method, use /auth/password_reset', 301


@namespace.route('/password_reset')
class Reset(Resource):

    @namespace.expect(api_model.auth_token_header, api_model.pw_reset)
    @namespace.marshal_with(api_model.response)
    @reset_or_login_token_required
    def put(self):
        """
        Change password
        """
        data = request.json

        return auth_service.reset_password(data), 200


@namespace.route('/password_forgot')
class Forgot(Resource):

    @namespace.expect(api_model.user_email)
    @namespace.marshal_with(api_model.link_response)
    def post(self):
        """
        Request a password reset email
        """
        data = request.json
        return auth_service.forgot_password(data), 200


@namespace.route('/verify')
class Forgot(Resource):

    @namespace.expect(api_model.user_auth, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.auth_response)
    @verify_token_required
    def put(self):
        """
        Verify account
        """
        data = request.json
        return auth_service.verify_account(data), 200
