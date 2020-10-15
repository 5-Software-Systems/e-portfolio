import json
import uuid

from sqlalchemy import ForeignKey

from .. import Model
from ... import db


class WidgetBase(Model):
    """
    Widget model for storing widgets
    """
    __tablename__ = 'widget'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(100), nullable=False, unique=True, default=lambda: str(uuid.uuid4()))
    portfolio_id = db.Column(db.Integer, ForeignKey('portfolio.id'), nullable=False)
    widget_type = db.Column(db.String(100), nullable=False)
    _location = db.Column(db.String(20), name='location', default=lambda: json.dumps([0, 0, 0, 0]), nullable=True)

    portfolio = db.relationship('Portfolio')

    __mapper_args__ = {
        'polymorphic_identity': 'widget',
        'polymorphic_on': widget_type
    }

    @property
    def location(self):
        return json.loads(self._location)

    @location.setter
    def location(self, value):
        self._location = json.dumps(value)

    @location.getter
    def location(self):
        return json.loads(self._location)

    # location = db.synonym('_location', descriptor=location)

    def marshal(self):
        columns = [str(i).split('.')[-1] for i in self.__table__.columns]
        columns = [i for i in columns if i not in ['id']]
        return {'public_id': self.public_id,
                'type': self.widget_type,
                'location': self.location,
                'data': {column: self.__getattribute__(column) for column in columns}
                }
