from sqlalchemy import ForeignKey

from .widget import WidgetBase
from ... import db


class Project(WidgetBase):
    """
    Feature model for storing features the user may want to highlight,
    e.g. past projects, skills
    """

    __tablename__ = 'project'

    id = db.Column(None, ForeignKey('widget.id'), primary_key=True)
    name = db.Column(db.String(50), nullable=True)
    description = db.Column(db.String(500))
    external_url = db.Column(db.String(100))

    __mapper_args__ = {'polymorphic_identity': 'project'}
