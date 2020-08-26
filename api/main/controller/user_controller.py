from flask import request
from flask_restplus import Resource, Namespace

from ..service import user_service

from .api_fields import *
from .widget_controller import widget


namespace = Namespace(
    name='user',
    path='/user',
    description='user related operations'
)

portfolio = namespace.model(
    name='portfolio',
    model=dict([public_id, portfolio_title, ('widgets', fields.List(fields.Nested(widget)))])
)
user = namespace.model(
    name='user',
    model=dict([public_id, email, name_first, name_last, portfolio_list])
)
new_user = namespace.model(
    name='new_user',
    model=dict([email, name_first, name_last, password])
)
user_creation = namespace.model(
    name='user_creation',
    model=dict([response_status, response_message, public_id, auth_token])
)


@namespace.route('')
class UserList(Resource):

    @namespace.marshal_with(user, as_list=True, envelope='users')
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @namespace.response(201, 'User successfully created.')
    @namespace.expect(new_user, validate=True)
    @namespace.marshal_with(user_creation)
    def post(self):
        """Creates a new User"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return user_service.create_new_user(data=data)


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The User identifier')
class User(Resource):

    @namespace.marshal_with(user, envelope='user')
    def get(self, public_id):
        """get a new_user given its identifier"""
        return user_service.get_a_user(public_id)
