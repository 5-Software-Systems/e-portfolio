import os
import sentry_sdk

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sentry_sdk.integrations.flask import FlaskIntegration


"""
To create the initial database, just import the db object from an interactive Python shell and run the 
SQLAlchemy.create_all() method to create the tables and database:
"""
db = SQLAlchemy()

flask_bcrypt = Bcrypt()

sentry_sdk.init(
    dsn="https://abcc2d9c067644ba9caf2af23da31446@o451388.ingest.sentry.io/5437200",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)


def create_app():
    static_folder = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../app/build/static')
    template_folder = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../../app/build')

    app = Flask(
        import_name='__main__',
        static_folder=static_folder,
        template_folder=template_folder,
        static_url_path='/'
    )

    config_file = os.path.join(os.path.abspath(os.path.dirname(__file__)), '../config.py')
    app.config.from_pyfile(config_file)
    db.init_app(app)

    flask_bcrypt.init_app(app)

    return app
