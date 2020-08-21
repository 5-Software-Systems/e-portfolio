import datetime
import jwt
from sqlalchemy.orm import relationship

from .. import db, flask_bcrypt
from ...config import SECRET_KEY
from .blacklist import BlacklistToken


class User(db.Model):
    """ User Model for storing new_user related details """
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name_first = db.Column(db.String(255), unique=False, nullable=False)
    name_last = db.Column(db.String(255), unique=False, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    public_id = db.Column(db.String(100), unique=True)
    password_hash = db.Column(db.String(100))

    widgets = relationship('Widget', back_populates='user')

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "<User '{} {}'>".format(self.id, self.email)

    @staticmethod
    def encode_auth_token(key):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
                'iat': datetime.datetime.utcnow(),
                'sub': key
            }
            return jwt.encode(
                payload,
                SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth_token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, SECRET_KEY)
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid bearer_auth_token. Please log in again.'
