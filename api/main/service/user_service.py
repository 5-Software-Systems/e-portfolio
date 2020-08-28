import sqlalchemy

from ..model import User
from ..util.exception import *


def create_new_user(data):
    user = User.query.filter_by(email=data['email']).first()
    if user:
        raise UserAlreadyExists

    try:
        new_user = User(**data)
        new_user.save()
    except sqlalchemy.exc.IntegrityError:
        raise RequestError('Data parameters missing')
    return new_user


def get_all_users():
    return User.query.all()


def get_a_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        raise UserNotFound(public_id)
    return user


def update_a_user(public_id, data):
    user = get_a_user(public_id)
    user.patch(**data)
    user.save()
    return user


def generate_token(user):
    auth_token = user.encode_auth_token()
    return {'message': 'Successfully registered.',
            'Authorization': auth_token.decode()
            }

