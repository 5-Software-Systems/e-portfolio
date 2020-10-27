import pytest

from app import db
from app import create_app

flask_app = create_app()


@pytest.fixture
def app():
    with flask_app.app_context():
        db.reflect()  # https://github.com/sqlalchemy/sqlalchemy/wiki/DropEverything
        db.drop_all()
        db.create_all()
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()
