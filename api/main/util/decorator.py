from functools import wraps
from flask import request

from ..service.auth_service import decode_token, split_bearer_token
from ..util.exception import AuthenticationError, Forbidden, RequestError


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)

        if not payload.get('type'):
            raise AuthenticationError

        token_id = payload.get('user')
        if not token_id:
            raise AuthenticationError

        request_id = kwargs.get('user_public_id')
        if not request_id:
            raise RequestError

        if not token_id == request_id:
            raise Forbidden

        return f(*args, **kwargs)

    return decorated


def login_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)

        if not payload.get('type') in ['login']:
            raise AuthenticationError

        token_id = payload.get('user')
        if not token_id:
            raise AuthenticationError

        request_id = kwargs.get('user_public_id')
        if not request_id:
            raise RequestError

        if not token_id == request_id:
            raise Forbidden

        return f(*args, **kwargs)

    return decorated


def reset_or_login_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)

        if not payload.get('type') in ['reset', 'login']:
            raise AuthenticationError

        token_id = payload.get('user')
        if not token_id:
            raise AuthenticationError

        request_id = kwargs.get('user_public_id')
        if not request_id:
            raise RequestError

        if not token_id == request_id:
            raise Forbidden

        return f(*args, **kwargs)

    return decorated


def verify_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = split_bearer_token(request.headers.get('Authorization'))
        payload = decode_token(token)

        if not payload.get('type') in ['verify']:
            raise AuthenticationError

        token_id = payload.get('user')
        if not token_id:
            raise AuthenticationError

        request_id = kwargs.get('user_public_id')
        if not request_id:
            raise RequestError

        if not token_id == request_id:
            raise Forbidden

        return f(*args, **kwargs)

    return decorated
