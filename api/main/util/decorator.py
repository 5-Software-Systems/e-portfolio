from functools import wraps
from flask import request

from ..service.auth_service import decode_token, split_bearer_token
from ..util.exception import AuthenticationError, Forbidden, RequestError


def token_required(key, types):
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = split_bearer_token(request.headers.get('Authorization'))
            payload = decode_token(token)

            if not payload.get('type') in types:
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
