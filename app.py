import sys

import pytest

from flask import Flask, render_template

from config import config
from api import blueprint, db, flask_bcrypt
from api.main.util.funcs import rel_path


def create_app():
    app = Flask(
        import_name='__main__',
        static_folder=rel_path('app/build', __file__),
        template_folder=rel_path('app/build', __file__),
        static_url_path='/'
    )

    app.config.from_object(config)
    print(config, file=sys.stderr)
    db.init_app(app)
    flask_bcrypt.init_app(app)

    app.register_blueprint(blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html', token='Hello World')

    @app.errorhandler(404)
    def not_found(e):
        return render_template('index.html', token='Hello World')

    return app
