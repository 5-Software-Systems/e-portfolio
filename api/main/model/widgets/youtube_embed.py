from sqlalchemy import ForeignKey

from .widget import WidgetBase
from ... import db


class Youtube_Embed(WidgetBase):
    """
    Feature model for storing features the user may want to highlight,
    e.g. past projects, skills
    """

    __tablename__ = 'youtube_embed'

    id = db.Column(None, ForeignKey('widget.id'), primary_key=True)
    external_url = db.Column(db.String(100))


    __mapper_args__ = {'polymorphic_identity': 'youtube_embed'}