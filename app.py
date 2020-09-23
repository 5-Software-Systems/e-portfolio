import logging
import os

from flask import Flask, render_template

from api import blueprint, db, flask_bcrypt


def rel_path(path):
    return os.path.join(os.path.abspath(os.path.dirname(__file__)), path)


app = Flask(
    import_name='__main__',
    static_folder=rel_path('app/build'),
    template_folder=rel_path('app/build'),
    static_url_path='/'
)

app.config.from_pyfile(rel_path('api/config.py'))
db.init_app(app)
flask_bcrypt.init_app(app)

app.register_blueprint(blueprint, url_prefix='/api')


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
