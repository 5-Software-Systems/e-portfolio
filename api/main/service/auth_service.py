from ..model import User, BlacklistToken
from ..util.db import save_changes


def login_user(data):
    try:
        # fetch the new_user data
        user = User.query.filter_by(email=data.get('email')).first()
        if user and user.check_password(data.get('password')):
            auth_token = user.encode_auth_token(user.id)
            if not isinstance(Exception, auth_token):
                return {'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode()
                        }, 200
        else:
            return {'status': 'fail',
                    'message': 'email or password does not match.'
                    }, 401

    except Exception as e:
        print(e)
        return {'status': 'fail',
                'message': 'Try again'
                }, 500


def logout_user(bearer_auth_token):
    """
    :param bearer_auth_token:
        'Bearer <auth_token>'
    :return:
    """
    auth_token = bearer_auth_token.split()[1]
    if auth_token:
        resp = User.decode_auth_token(auth_token=auth_token)
        if not isinstance(resp, str):
            # mark the bearer_auth_token as blacklisted
            return save_token(token=auth_token)
        else:
            return {'status': 'fail',
                    'message': resp
                    }, 401
    else:
        return {'status': 'fail',
                'message': 'Provide a valid auth bearer_auth_token.'
                }, 403


def decode_auth_token(bearer_auth_token):
    """
    :param bearer_auth_token:
        'Bearer <auth_token>'
    :return:
    """
    auth_token = bearer_auth_token.split()[1]
    resp = User.decode_auth_token(auth_token=auth_token)
    if not isinstance(resp, str):
        user = User.query.filter_by(id=resp['sub']).first()
        return {'status': 'success',
                'data': {'public_id': user.public_id,
                         'name_first': user.name_first,
                         'name_last': user.name_last,
                         'email': user.email,
                         'registered_on': str(user.registered_on)
                         }
                }, 200
    return {'status': 'fail',
            'message': resp
            }, 401


def get_logged_in_user(new_request):
    bearer_auth_token = new_request.headers.get('Authorization')
    if bearer_auth_token:
        return decode_auth_token(bearer_auth_token=bearer_auth_token)
    else:
        return {'status': 'fail',
                'message': 'Provide a valid auth_token.'
                }, 401


def save_token(token):
    blacklist_token = BlacklistToken(token=token)
    try:
        # insert the bearer_auth_token
        save_changes(blacklist_token)
        return {'status': 'success',
                'message': 'Successfully logged out.'
                }, 200
    except Exception as e:
        return {'status': 'fail',
                'message': e
                }, 200
