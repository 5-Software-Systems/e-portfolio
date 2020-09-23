from flask_script import Manager

from app import app, db
from api.test import db as dbtest
from api.test import api_test

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
def testapi():
    api_test.run_tests()


if __name__ == "__main__":
    manager.run()
