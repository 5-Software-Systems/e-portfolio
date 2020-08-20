from api.main import db
from ..model.blacklist import BlacklistToken
from ..model.user import User


class Auth:

    @staticmethod
    def login_user(data):
        try:
            # fetch the new_user data
            user = User.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = user.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode()
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
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
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth bearer_auth_token.'
            }
            return response_object, 403

    @staticmethod
    def decode_auth_token(bearer_auth_token):
        """
        :param bearer_auth_token:
            'Bearer <auth_token>'
        :return:
        """
        auth_token = bearer_auth_token.split()[1]
        resp = User.decode_auth_token(auth_token=auth_token)
        if not isinstance(resp, str):
            user = User.query.filter_by(id=resp).first()
            response_object = {
                'status': 'success',
                'data': {
                    'user_id': user.id,
                    'email': user.email,
                    'admin': user.admin,
                    'registered_on': str(user.registered_on)
                }
            }
            return response_object, 200
        response_object = {
            'status': 'fail',
            'message': resp
        }
        return response_object, 401

    @staticmethod
    def get_logged_in_user(new_request):
        bearer_auth_token = new_request.headers.get('Authorization')
        if bearer_auth_token:
            return Auth.decode_auth_token(bearer_auth_token=bearer_auth_token)
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth_token.'
            }
            return response_object, 401


def save_token(token):
    blacklist_token = BlacklistToken(token=token)
    try:
        # insert the bearer_auth_token
        db.session.add(blacklist_token)
        db.session.commit()
        response_object = {
            'status': 'success',
            'message': 'Successfully logged out.'
        }
        return response_object, 200
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': e
        }
        return response_object, 200