from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from . import Model
from .. import db


class File(Model):
    """
    File, img, pdf, etc...
    """
    __tablename__ = 'file'
    __table_args__ = (db.UniqueConstraint('user_id', 'file_name'),)

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    user = relationship('User')
    file_name = db.Column(db.String(100))
    file_binary = db.Column(db.LargeBinary)
