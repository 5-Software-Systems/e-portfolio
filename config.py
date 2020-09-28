import os

DEBUG = True
TESTING = False
# SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').format(root=rel_path('', __file__))
SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = False

GMAIL_USER = os.environ.get('SMTP_EMAIL')
GMAIL_PASS = os.environ.get('SMTP_PASS')
