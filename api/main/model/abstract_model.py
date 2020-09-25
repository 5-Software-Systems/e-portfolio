"""
Attribution: https://dev.to/chidioguejiofor/making-sqlalchemy-models-simpler-by-creating-a-basemodel-3m9c
From^
    One thing I have found myself doing is rushing into abstracting a particular logic and then realising 10 commits
    later that I need to edit the method in the Base class but it has been tightly coupled to some concrete
    implementation. You can avoid falling into this by waiting until you have repeated something about 4-5 times before
    abstracting
"""

from datetime import datetime, timezone

from sqlalchemy import orm, exc

from .. import db


class Model(db.Model):
    __abstract__ = True

    # id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    created_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    def before_save(self, *args, **kwargs):
        pass

    def after_save(self, *args, **kwargs):
        pass

    def save(self, commit=True):
        self.before_save()
        db.session.add(self)
        if commit:
            try:
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                raise e

        self.after_save()

    def patch(self, *args, **kwargs):
        for key, val in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, val)
            else:
                raise TypeError('{} is an invalid keyword argument for {}'.format(key, self.__class__.__name__))

    def delete(self, commit=True):
        db.session.delete(self)
        if commit:
            db.session.commit()

    @classmethod
    def eager(cls, *args):
        cols = [orm.joinedload(arg) for arg in args]
        return cls.query.options(*cols)
