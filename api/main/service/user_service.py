import uuid
import datetime

from ..model import User
from ..util.db import save_db_object
from ..util.exception import UserNotFound, UserAlreadyExists


def create_new_user(data):
    """
    :param data: {email, name_first, name_last, password}
    :return:
    """
    user = User.query.filter_by(email=data['email']).first()
    if user:
        raise UserAlreadyExists('User already exists, log in instead')

    new_user = User(
        email=data['email'],
        name_first=data['name_first'],
        name_last=data['name_last'],
        password=data['password'],
        registered_on=datetime.datetime.utcnow()
    )
    new_user.save()
    response_object, code = generate_token(new_user)
    response_object.update({'public_id': new_user.public_id})
    return response_object, 201


def get_all_users():
    return User.query.all()


def get_a_user(public_id):
    user = User.query.filter_by(public_id=public_id).first()
    if not user:
        raise UserNotFound('User {} not found'.format(public_id))
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
