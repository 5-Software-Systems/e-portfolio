import pytest

from app import db
from app import create_app

flask_app = create_app()


# def pytest_addoption(parser):
#     parser.addoption('--db_env', action='store')
#
#
# @pytest.fixture
# def app(request):
#     db_env = request.config.getoption("--db_env")
#     if db_env == 'memory':
#         env = 'testlocal'
#     elif db_env == 'postgresql':
#         env = 'test'
#     else:
#         env = 'testlocal'
#
#     flask_app = create_app(env=env)
#
#     with flask_app.app_context():
#         db.drop_all()
#         db.create_all()
#     yield flask_app


@pytest.fixture
def app():
    with flask_app.app_context():
        db.drop_all()
        db.create_all()
    yield flask_app


@pytest.fixture
def client(app):
    return app.test_client()
