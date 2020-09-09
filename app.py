import logging

from api.test import db as dbtest

from api import build_app


dbtest.delete()
dbtest.create_app()

app = build_app()

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
