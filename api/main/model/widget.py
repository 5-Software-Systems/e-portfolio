from abc import abstractmethod

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from . import Model
from .. import db


class Widget(Model):
    """
    Widget model for storing widgets
    """
    __tablename__ = 'widget'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('user.id'))
    user = relationship('User', back_populates='widgets')
    widget_type = db.Column(db.String(100), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'widget',
        'polymorphic_on': widget_type
    }

    @abstractmethod
    def marshal(self):
        return {'type': self.widget_type,
                'data': {}
                }
