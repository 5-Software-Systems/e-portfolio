import os

from dotenv import load_dotenv
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
TESTING = False
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
SECRET_KEY = os.environ.get('SECRET_KEY')
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = False

GMAIL_USER = os.environ.get('SMTP_EMAIL')
GMAIL_PASS = os.environ.get('SMTP_PASS')
