from sqlalchemy import ForeignKey

from .embed import Embed
from ... import db


class Spotify_Embed(Embed):
    """
    Feature model for storing features the user may want to highlight,
    e.g. past projects, skills
    """

    __tablename__ = 'spotify_embed'

    id = db.Column(None, ForeignKey('embed.id'), primary_key=True)

    __mapper_args__ = {'polymorphic_identity': 'spotify_embed'}
