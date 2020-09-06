from flask import render_template

from api.main import create_app, db
from api import blueprint
from api.main.model import *
import os


def build_app():
    app = create_app()
    app.register_blueprint(blueprint, url_prefix='/api')

    @app.route('/')
    def index():
        return render_template('index.html', token='Hello World')

    with app.app_context():
        db.create_all()

    return app


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 80))
    build_app().run(debug=False, host='0.0.0.0', port=port)
