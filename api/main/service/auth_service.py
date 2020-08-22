from ..model import User, BlacklistToken
from ..util.db import save_db_object
from ..util.exception import LoginNotFound, RequestError


def login_user(data):
    user = User.query.filter_by(email=data.get('email')).first()
    if not user:
        raise LoginNotFound
    if not user.check_password(data.get('password')):
        raise LoginNotFound

    auth_token = user.encode_auth_token(user.id)
    return {'status': 'success',
            'message': 'Successfully logged in.',
            'Authorization': auth_token.decode()
            }, 200


def logout_user(bearer_auth_token):
    """
    :param bearer_auth_token:
        'Bearer <auth_token>'
    :return:
    """
    auth_token = split_bearer_token(bearer_auth_token)

    # check token is valid
    User.decode_auth_token(auth_token=auth_token)

    return blacklist_token(auth_token=auth_token)


def decode_auth_token(bearer_auth_token):
    """
    :param bearer_auth_token:
        'Bearer <auth_token>'
    :return:
    """
    auth_token = split_bearer_token(bearer_auth_token)

    resp = User.decode_auth_token(auth_token=auth_token)

    user = User.query.filter_by(id=resp['sub']).first()

    return {'status': 'success',
            'data': {'public_id': user.public_id,
                     'name_first': user.name_first,
                     'name_last': user.name_last,
                     'email': user.email,
                     'registered_on': str(user.registered_on)
                     }
            }, 200


def get_logged_in_user(new_request):
    bearer_auth_token = new_request.headers.get('Authorization')
    if not bearer_auth_token:
        raise RequestError
    return decode_auth_token(bearer_auth_token=bearer_auth_token)


def blacklist_token(auth_token):
    blacklisted_auth_token = BlacklistToken(token=auth_token)
    save_db_object(blacklisted_auth_token)
    return {'status': 'success',
            'message': 'Successfully logged out.'
            }, 200


def split_bearer_token(bearer_auth_token):
    try:
        auth_token = bearer_auth_token.split()[1]
    except IndexError:
        raise RequestError
    return auth_token
