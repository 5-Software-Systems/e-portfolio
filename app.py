import logging

from flask import render_template

from api.main import create_app, db
from api import blueprint
from api.main.model import *
from api.test import db as dbtest


def build_app():
    app = create_app()
    app.register_blueprint(blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html', token='Hello World')

    # with app.app_context():
    #     db.create_all()

    return app


dbtest.delete()
dbtest.create_app()

app = build_app()

if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
