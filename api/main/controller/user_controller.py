from flask import request
from flask_restplus import Resource, Namespace

from ..service import user_service

from .api_fields import *


api = Namespace(
    name='user',
    path='/user',
    description='user related operations')
user = api.model(
    name='user',
    model={user_public_id, email, name_first, name_last}
)
new_user = api.model(
    name='new_user',
    model={email, name_first, name_last, password}
)
user_creation = api.model(
    name='user_creation',
    model={response_status, response_message, user_public_id, auth_token}
)
# profile = api.model(
#     name='profile',
#     model={user}
# )


@api.route('/')
class UserList(Resource):

    @api.doc('list_of_registered_users')
    @api.marshal_list_with(user)
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @api.response(201, 'User successfully created.')
    @api.doc('create a new new_user')
    @api.expect(new_user, validate=True)
    @api.marshal_with(user_creation)
    def post(self):
        """Creates a new User"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return user_service.create_new_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(user)
    def get(self, public_id):
        """get a new_user given its identifier"""
        return user_service.get_a_user(public_id)


@api.route('/<public_id>/profile')
@api.param('public_id', 'The User identifier')
class Profile(Resource):
    @api.doc('get a user profile')
    def get(self, public_id):
        return user_service.get_a_user_profile(public_id)
