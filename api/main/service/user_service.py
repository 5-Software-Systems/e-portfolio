import uuid
import datetime

from ..model import User
from ..util.db import save_changes


def create_new_user(data):
    """
    :param data: {email, name_first, name_last, password}
    :return:
    """
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return {'status': 'fail',
                'message': 'User already exists. Please Log in.',
                }, 409

    new_user = User(
        public_id=str(uuid.uuid4()),
        email=data['email'],
        name_first=data['name_first'],
        name_last=data['name_last'],
        password=data['password'],
        registered_on=datetime.datetime.utcnow()
    )
    save_changes(new_user)
    response_object, code = generate_token(new_user)
    response_object.update({'public_id': new_user.public_id})
    return response_object, 201


def get_all_users():
    return User.query.all()


def get_a_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return {'status': 'fail',
                'message': 'No user found',
                }, 404
    return user, 200


def get_a_user_profile(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        return {'status': 'fail',
                'message': 'No user found',
                }, 404
    return user, 200


def generate_token(user):
    try:
        # generate the auth bearer_auth_token
        auth_token = user.encode_auth_token(user.id)
        return {'status': 'success',
                'message': 'Successfully registered.',
                'Authorization': auth_token.decode()
                }, 201
    except Exception as e:
        return {'status': 'fail',
                'message': 'Some error occurred. Please try again.',
                'debug': str(e),
                }, 401
