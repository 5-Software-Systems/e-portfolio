from flask import request
from flask_restplus import Resource

from ..service.auth_service import Auth
from ..util.decorator import token_required
from ..util.dto import AuthDto
from ..model.user import User

api = AuthDto.api


@api.route('/login')
class UserLogin(Resource):
    """
    User Login Resource
    """

    @api.doc('new_user login')
    @api.expect(AuthDto.user_auth, validate=True)
    @api.marshal_with(AuthDto.auth_response)
    def post(self):
        # get the post data
        post_data = request.json
        return Auth.login_user(data=post_data)


@api.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """

    @api.doc('logout a new_user')
    @api.marshal_with(AuthDto.auth_response)
    @api.expect(AuthDto.auth_token)
    @token_required
    def post(self):
        # get auth bearer_auth_token
        bearer_auth_token = request.headers.get('Authorization')
        return Auth.logout_user(bearer_auth_token=bearer_auth_token)


@api.route('/check_token')
class CheckToken(Resource):
    """
    Check bearer_auth_token
    """

    @api.doc('check a auth_token')
    @api.expect(AuthDto.auth_token, validate=True)
    def get(self):
        data = request.json
        auth_token = data['auth_token']

        return {'resp': User.decode_auth_token(auth_token=auth_token)}
