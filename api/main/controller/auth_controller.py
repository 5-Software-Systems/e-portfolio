from flask import request
from flask_restplus import Resource, Namespace

from ..service import auth_service
from ..util.decorator import login_required, reset_token_required

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
        # TODO Validation
        data = request.json
        return auth_service.login_user(data=data), 200


@namespace.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @namespace.marshal_with(api_model.auth_response)
    @namespace.expect(api_model.auth_token_header)
    @login_required
    def post(self):
        """
        Log out a user
        """
        # TODO Validation
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
        # TODO Validation
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.get_logged_in_user(bearer_auth_token), 200


@namespace.route('/reset')
class Reset(Resource):
    """
    Reset log in details
    """

    @namespace.expect(api_model.user_email)
    @namespace.marshal_with(api_model.response)
    def post(self):
        """
        Reset log in details
        """
        data = request.json
        return auth_service.send_reset_password(data), 200

    @namespace.expect(api_model.auth_token_header, api_model.pw_reset)
    @namespace.marshal_with(api_model.response)
    @reset_token_required
    def put(self):
        """
        Change password
        """
        data = request.json
        return auth_service.reset_password(data), 200
