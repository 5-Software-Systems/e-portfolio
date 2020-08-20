from flask import request
from flask_restplus import Resource

from ..util.dto import UserDto
from ..util.decorator import admin_token_required
from ..service import user_service

api = UserDto.api


@api.route('/')
class UserList(Resource):
    @admin_token_required
    @api.doc('list_of_registered_users')
    @api.marshal_list_with(UserDto.user)
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @api.response(201, 'User successfully created.')
    @api.doc('create a new new_user')
    @api.expect(UserDto.new_user, validate=True)
    @api.marshal_with(UserDto.user_creation)
    def post(self):
        """Creates a new User"""
        data = request.json
        return user_service.save_new_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
class User(Resource):
    @api.doc('get a new_user')
    @api.marshal_with(UserDto.user)
    def get(self, public_id):
        """get a new_user given its identifier"""
        user = user_service.get_a_user(public_id)
        if not user:
            api.abort(404, 'User not found')
        else:
            return user
