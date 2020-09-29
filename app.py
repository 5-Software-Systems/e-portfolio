import logging
import pytest

from flask import Flask, render_template
from dotenv import load_dotenv

from api import blueprint, db, flask_bcrypt
from api.main.util.funcs import rel_path
load_dotenv()


def create_app(conf_file):
    app = Flask(
        import_name='__main__',
        static_folder=rel_path('app/build', __file__),
        template_folder=rel_path('app/build', __file__),
        static_url_path='/'
    )

    app.config.from_pyfile(conf_file)
    db.init_app(app)
    flask_bcrypt.init_app(app)

    app.register_blueprint(blueprint, url_prefix='/api')

    return app


app = create_app(rel_path('config.py', __file__))


@app.route('/')
def index():
    return render_template('index.html', token='Hello World')


@app.errorhandler(404)
def not_found(e):
    return render_template('index.html', token='Hello World')


if __name__ != '__main__':
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
