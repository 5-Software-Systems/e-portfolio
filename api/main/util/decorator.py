from functools import wraps
from flask import request, current_app

from ..service.auth_service import decode_token, split_bearer_token
from ..util.exception import AuthenticationError, Forbidden, RequestError


def token_required(key, permissions):
    """
    :param key: the key for the resource being protected eg. user, portfolio
    :param permissions: list of permissions eg. login, reset, verify
    :return:
    """
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not current_app.config['AUTH']:
                return f(*args, **kwargs)

            token = split_bearer_token(request.headers.get('Authorization'))
            payload = decode_token(token)

            if not payload.get('type') in permissions:
                raise AuthenticationError

            token_id = payload.get(key)
            if not token_id:
                raise AuthenticationError

            request_id = kwargs.get(f'{key}_public_id')
            if not request_id:
                raise RequestError

            if not token_id == request_id:
                raise Forbidden

            return f(*args, **kwargs)

        return decorated

    return token_required
