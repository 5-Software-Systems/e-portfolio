from flask_script import Manager

from app import app, db
from api.util import db as dbtest

manager = Manager(app)


@manager.command
def reset():
    dbtest.delete()
    dbtest.create(app, db)


@manager.command
def populate():
    dbtest.clean(app, db)
    dbtest.populate(app)


@manager.command
def clean():
    dbtest.clean(app, db)


if __name__ == "__main__":
    manager.run()
