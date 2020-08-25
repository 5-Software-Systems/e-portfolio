import uuid
from abc import abstractmethod

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

from api.main.model import Model
from api.main import db


class WidgetBase(Model):
    """
    Widget model for storing widgets
    """
    __tablename__ = 'widget'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(100), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    user = relationship('User', back_populates='widgets')
    widget_type = db.Column(db.String(100), nullable=False)

    __mapper_args__ = {
        'polymorphic_identity': 'widget',
        'polymorphic_on': widget_type
    }

    @abstractmethod
    def marshal(self):
        return {'public_id': self.public_id,
                'type': self.widget_type,
                'data': {}
                }
