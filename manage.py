from flask_script import Manager

from app import db, create_app
from api.util import db as dbtest

app = create_app()
manager = Manager(app)


@manager.command
def run():
    app.run()


@manager.command
def reset():
    dbtest.delete(app, db)
    dbtest.create(app, db)


@manager.command
def populate():
    dbtest.clean(app, db)
    dbtest.populate(app, db)


@manager.command
def create():
    dbtest.create(app, db)


@manager.command
def clean():
    dbtest.clean(app, db)


if __name__ == "__main__":
    manager.run()
