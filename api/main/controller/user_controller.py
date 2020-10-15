from flask import request
from flask_restplus import Resource, Namespace

from ..service import user_service, portfolio_service, widget_service

from . import api_model
from ..util.decorator import login_token_required

namespace = Namespace(
    name='user',
    path='/',
    description='User related operations'
)


@namespace.route('/user')
class UserList(Resource):

    @namespace.marshal_with(api_model.user_basic, as_list=True, envelope='users')
    def get(self):
        """List all Users"""
        return user_service.get_all_users()

    @namespace.expect(api_model.user_new, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.user_basic, envelope='user')
    def post(self):
        """Creates a new User"""
        data = request.json
        return user_service.create_new_user(data=data), 201


@namespace.route('/user/<user_public_id>')
@namespace.param('user_public_id', 'The User identifier')
class User(Resource):

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.user_basic, envelope='user')
    @login_token_required
    def get(self, user_public_id):
        """Get a User"""
        return user_service.get_a_user(user_public_id), 200

    @namespace.expect(api_model.user_change, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.user_basic, envelope='user')
    @login_token_required
    def patch(self, user_public_id):
        """Update a User"""
        data = request.json
        return user_service.update_a_user(public_id=user_public_id, data=data), 200
