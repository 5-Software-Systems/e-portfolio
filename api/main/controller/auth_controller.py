from flask import request
from flask_restplus import Resource

from ..service import auth_service
from ..util.decorator import login_required

from . import api_model

namespace = api_model.Auth.namespace


@namespace.route('/login')
class UserLogin(Resource):
    """
    User Login Resource
    """

    @namespace.expect(api_model.Auth.user_auth, validate=True)
    @namespace.marshal_with(api_model.Auth.auth_response)
    def post(self):
        """
        Log in a user
        """
        # TODO Validation
        return auth_service.login_user(data=request.json)


@namespace.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @namespace.marshal_with(api_model.Auth.auth_response)
    @namespace.expect(api_model.Auth.auth_token_header)
    @login_required
    def post(self):
        """
        Log out a user
        """
        # TODO Validation
        bearer_auth_token = request.headers.get('Authorization')

        return auth_service.logout_user(bearer_auth_token=bearer_auth_token)


@namespace.route('/check_token')
class CheckToken(Resource):
    """
    Check bearer_auth_token
    """

    # @api.marshal_with(auth_response)
    @namespace.expect(api_model.Auth.auth_token, validate=True)
    def get(self):
        """
        Check the status and user of an auth token (for development only)
        """
        # TODO Validation
        bearer_auth_token = request.json['bearer_auth_token']

        return auth_service.decode_auth_token(bearer_auth_token=bearer_auth_token)
