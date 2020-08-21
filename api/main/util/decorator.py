from functools import wraps
from flask import request

from ..service.auth_service import get_logged_in_user


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        data, status = get_logged_in_user(request)
        token = data.get('data')

        if not token:
            return data, status

        return f(*args, **kwargs)

    return decorated


def admin_token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        data, status = get_logged_in_user(request)
        token = data.get('data')

        if not token:
            return data, status

        admin = token.get('admin')
        if not admin:
            response_object = {
                'status': 'fail',
                'message': 'admin auth_token required'
            }
            return response_object, 401

        return f(*args, **kwargs)

    return decorated
