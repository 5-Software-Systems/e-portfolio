import pytest

from api.main.util.funcs import rel_path
from app import db
from app import create_app

flask_app = create_app(rel_path('config.py', __file__))


@pytest.fixture
def app():
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()
