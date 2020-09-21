import os

from dotenv import load_dotenv
load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DEBUG = True
# SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "eportfolio.db")
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', "sqlite:///" + os.path.join(BASE_DIR, "eportfolio.db"))
SECRET_KEY = os.environ.get('SECRET_KEY', 'secret')
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = False