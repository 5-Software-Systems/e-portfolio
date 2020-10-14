import argparse

import pytest

from app import db
from app import create_app
from config import TestingConfig

flask_app = create_app()

my_parser = argparse.ArgumentParser(description='List the content of a folder')
my_parser.add_argument('database', default='postgresql', metavar='database_env', help='the database environment to run the test in, memory or postgresql')
args = my_parser.parse_args()

if args.database == 'memory':
    TestingConfig.SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
elif args.database == 'postgresql':
    pass
else:
    raise Exception(f'{args.database} is not a valid testing environment')

# flask_app.config.from_object(TestingConfig)


@pytest.fixture
def app():
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()
