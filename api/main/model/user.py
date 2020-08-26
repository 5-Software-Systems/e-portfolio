import datetime
import uuid

import jwt
from sqlalchemy.orm import relationship

from . import Model
from .. import db, flask_bcrypt

from ...config import SECRET_KEY
from .blacklist import BlacklistToken
from ..util.exception import TokenExpired, TokenInvalid, TokenBlacklisted


class User(Model):
    """ User Model for storing new_user related details """
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(100), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    name_first = db.Column(db.String(255), unique=False, nullable=False)
    name_last = db.Column(db.String(255), unique=False, nullable=False)
    password_hash = db.Column(db.String(100))
    registered_on = db.Column(db.DateTime, nullable=False, default=lambda: datetime.datetime.now(datetime.timezone.utc))

    portfolios = relationship('Portfolio', back_populates='user')

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(key):
        """
        Generates the Auth Token
        :return: string
        """
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

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth_token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, SECRET_KEY)
        except jwt.ExpiredSignatureError:
            raise TokenExpired
        except jwt.InvalidTokenError:
            raise TokenInvalid

        if BlacklistToken.check_blacklist(auth_token):
            raise TokenBlacklisted

        return payload
