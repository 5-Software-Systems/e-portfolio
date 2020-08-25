from sqlalchemy import ForeignKey

from .widget import WidgetBase
from ... import db


class Image(WidgetBase):
    """
    About model for storing about widgets
    """
    __tablename__ = 'image'

    id = db.Column(None, ForeignKey('widget.id'), primary_key=True)
    image_url = db.Column(db.String(), nullable=False)

    __mapper_args__ = {'polymorphic_identity': 'image'}

    def marshal(self):
        r = super().marshal()
        r['data'].update({'image': self.image_url})
        return r
