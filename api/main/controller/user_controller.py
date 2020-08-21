from flask import request
from flask_restplus import Resource, Namespace
from flask_restplus import marshal

from ..service import user_service

from .api_fields import *

api = Namespace(
    name='user',
    path='/user',
    description='user related operations'
)

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
widget = api.model(
    'widget',
    model={widget_type, widget_data}
)
profile = api.model(
    name='profile',
    model={'user': fields.Nested(user), 'widgets': fields.List(fields.Nested(widget))}
)


@api.route('/')
class UserList(Resource):

    @api.marshal_list_with(user)
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @api.response(201, 'User successfully created.')
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

    @api.marshal_with(user, envelope='user')
    def get(self, public_id):
        """get a new_user given its identifier"""
        return user_service.get_a_user(public_id)


@api.route('/<public_id>/profile')
@api.param('public_id', 'The User identifier')
class Profile(Resource):

    @api.marshal_list_with(profile, envelope='profile')
    def get(self, public_id):
        res, code = user_service.get_a_user(public_id)
        if code != 200:
            return res, code
        return {'user': marshal(res, user),
                'widgets': [w.marshal() for w in res.widgets]
                }, code
