from flask_restplus import Namespace

from .dto_fields import *


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model(
        name='user',
        model=dict({user_public_id, email, username})
    )
    new_user = api.model(
        name='new_user',
        model=dict({email, username, password})
    )
    user_creation = api.model(
        name='user_creation',
        model=dict({response_status, response_message, user_public_id, auth_token})
    )


class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model(
        name='auth_details',
        model=dict({email, password})
    )
    auth_response = api.model(
        name='auth_response',
        model=dict({response_status, response_message, auth_token})
    )
    auth_token = api.model(
        name='bearer_auth_token',
        model=dict({bearer_auth_token})
    )
