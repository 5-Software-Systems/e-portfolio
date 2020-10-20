from sqlalchemy import ForeignKey

from .embed import Embed
from ... import db


class Instagram_Embed(Embed):
    """
    Feature model for storing features the user may want to highlight,
    e.g. past projects, skills
    """

    __tablename__ = 'instagram_embed'

    id = db.Column(None, ForeignKey('embed.id'), primary_key=True)

    __mapper_args__ = {'polymorphic_identity': 'instagram_embed'}