import uuid

from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey

from . import Model
from .. import db


class Portfolio(Model):
    """Portfolio model for storing portfolio data"""

    __tablename__ = 'portfolio'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    public_id = db.Column(db.String(100), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(30), nullable=False)
    background_url = db.Column(db.String(), nullable=True)

    user = relationship('User')
    widgets = relationship('WidgetBase', cascade="all, delete")

