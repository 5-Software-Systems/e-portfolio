from sqlalchemy import ForeignKey

from ..widget import Widget, db


class About(Widget):
    """
    About model for storing about widgets
    """
    __tablename__ = 'about'

    id = db.Column(None, ForeignKey('widget.id'), primary_key=True)
    about = db.Column(db.String(280), nullable=False)

    __mapper_args__ = {'polymorphic_identity': 'about'}
