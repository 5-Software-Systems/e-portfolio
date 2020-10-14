import os


class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PROPAGATE_EXCEPTIONS = False

    SECRET_KEY = os.environ.get('SECRET_KEY')
    GMAIL_USER = os.environ.get('SMTP_EMAIL')
    GMAIL_PASS = os.environ.get('SMTP_PASS')


class LocalConfig(Config):
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI')


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DB_URI')


class TestingLocalConfig(Config):
    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DB_URI')


config_by_name = {
    'local': LocalConfig,
    'debug': LocalConfig,
    'test': TestingConfig,
    'testlocal': TestingLocalConfig,
    'production': ProductionConfig
}
