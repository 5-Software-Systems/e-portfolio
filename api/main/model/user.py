import datetime
import uuid

from sqlalchemy.orm import relationship

from . import Model
from .. import db, flask_bcrypt


class User(Model):
    """ User Model for storing new_user related details """
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    public_id = db.Column(db.String(100), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(255), unique=True, nullable=False)
    name_first = db.Column(db.String(255), unique=False, nullable=False)
    name_last = db.Column(db.String(255), unique=False, nullable=False)
    password_hash = db.Column(db.String(100), nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    verified = db.Column(db.Boolean, default=False)

    portfolios = relationship('Portfolio', cascade="all, delete")

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)
