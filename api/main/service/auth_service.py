import datetime

import jwt
from flask import current_app

from . import user_service, email_service
from ..model import BlacklistToken
from ..util.db import save_db_object
from ..util.exception import *


def login_user(data):
    try:
        user = user_service.get_a_user_by_email(data.get('email'))
    except UserNotFound:
        raise LoginNotFound

    if not user:
        raise LoginNotFound
    if not user.check_password(data.get('password')):
        raise LoginNotFound

    auth_token = encode_token({'login': user.public_id}, datetime.timedelta(days=1))

    return {'status': 'success',
            'message': 'Successfully logged in.',
            'Authorization': auth_token.decode()
            }


def logout_user(bearer_auth_token):
    """
    :param bearer_auth_token:
        'Bearer <auth_token>'
    :return:
    """
    auth_token = split_bearer_token(bearer_auth_token)
    decode_token(auth_token)
    blacklist_token(auth_token)

    return {'status': 'success',
            'message': 'Successfully logged out'
            }


def get_logged_in_user(bearer_auth_token):
    auth_token = split_bearer_token(bearer_auth_token)

    payload = decode_token(auth_token)
    public_id = next(item for item in [payload.get('reset'), payload.get('login')] if item is not None)

    if not public_id:
        raise AuthenticationError

    return user_service.get_a_user(public_id)


def forgot_password(data):
    user = user_service.get_a_user_by_email(data.get('email'))
    auth_token = encode_token({'reset': user.public_id}, datetime.timedelta(minutes=15))
    link = email_service.send_reset_email(user, auth_token)
    return {
        'status': 'success',
        'message': 'Reset link sent (if user exists)',
        'link': link
    }


def reset_password(data):
    user = user_service.get_a_user(public_id=data.get('public_id'))
    if not user:
        raise LoginNotFound
    user.password = data.get('password')
    user.save()
    return {'status': 'success',
            'message': 'Password reset, you can now log in'
            }


def blacklist_token(auth_token):
    blacklisted_auth_token = BlacklistToken(token=auth_token)
    save_db_object(blacklisted_auth_token)


def split_bearer_token(bearer_auth_token):
    try:
        auth_token = bearer_auth_token.split()[1]
    except (IndexError, AttributeError):
        raise RequestError
    return auth_token


def encode_token(payload: dict, expiry=datetime.timedelta(days=1)):
    payload.update({
        'exp': datetime.datetime.utcnow() + expiry,
        'iat': datetime.datetime.utcnow(),
    })
    return jwt.encode(
        payload,
        current_app.config['SECRET_KEY'],
        algorithm='HS256'
    )


def decode_token(token):
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'])
    except jwt.ExpiredSignatureError:
        raise TokenExpired
    except jwt.InvalidTokenError:
        raise TokenInvalid

    if BlacklistToken.check_blacklist(token):
        raise TokenBlacklisted
    if datetime.datetime.utcfromtimestamp(payload['exp']) < datetime.datetime.utcnow():
        raise TokenExpired

    return payload
