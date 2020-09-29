import os

DEBUG = True
TESTING = False
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = False

SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI')
SECRET_KEY = os.environ.get('SECRET_KEY')

GMAIL_USER = os.environ.get('SMTP_EMAIL')
GMAIL_PASS = os.environ.get('SMTP_PASS')
