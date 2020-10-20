from sqlalchemy import ForeignKey

from .embed import Embed
from ... import db


class Youtube_Embed(Embed):
    """
    Feature model for storing features the user may want to highlight,
    e.g. past projects, skills
    """

    __tablename__ = 'youtube_embed'

    id = db.Column(None, ForeignKey('embed.id'), primary_key=True)

    __mapper_args__ = {'polymorphic_identity': 'youtube_embed'}
