from sqlalchemy import ForeignKey

from ..widget import Widget, db


class Image(Widget):
    """
    About model for storing about widgets
    """
    __tablename__ = 'image'

    id = db.Column(None, ForeignKey('widget.id'), primary_key=True)
    image = db.Column(db.Integer, nullable=False)

    __mapper_args__ = {'polymorphic_identity': 'image'}

    def marshal(self):
        r = super().marshal()
        r['data'].update({'image': self.image})
        return r
