from functools import wraps
from flask import request

from ..service.auth_service import decode_token, split_bearer_token
from ..util.exception import AuthenticationError


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)
        user = payload.get('login')

        if not user:
            raise AuthenticationError

        return f(*args, **kwargs)

    return decorated


def reset_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)
        user = payload.get('reset')

        if not user:
            raise AuthenticationError

        return f(*args, **kwargs)

    return decorated
