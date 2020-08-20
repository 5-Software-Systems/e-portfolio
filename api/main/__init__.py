from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
flask_bcrypt = Bcrypt()


def create_api():
    app = Flask(
        import_name='__main__',
        static_folder='../app/build/static',
        template_folder='../app/build'
    )

    # db.init_app(app)
    flask_bcrypt.init_app(app)

    return app
