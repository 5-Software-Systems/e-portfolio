import os

DEBUG = True
TESTING = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
SECRET_KEY = 'secret'
GMAIL_USER = os.environ.get('SMTP_EMAIL')
GMAIL_PASS = os.environ.get('SMTP_PASS')
