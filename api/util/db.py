import json
import os

from ..main.model import *


def clean(app, db):
    with app.app_context():
        meta = db.metadata
        for table in reversed(meta.sorted_tables):
            db.session.execute(table.delete())
        db.session.commit()


def delete():
    try:
        os.remove('eportfolio.db')
    except FileNotFoundError:
        pass


def create(app, db):
    with app.app_context():
        db.create_all()


def populate(app):
    data_dir = os.path.join(os.path.dirname(__file__), 'data')
    with app.app_context():
        to_do = [data_file for data_file in os.listdir(data_dir) if data_file.endswith('.json')]
        for data_file in to_do:
            model_name = data_file.split('.')[0]
            model = globals()[model_name]
            with open('{}/{}'.format(data_dir, data_file)) as f:
                data = json.load(f)
            for record in data:
                obj = model(**record)
                obj.save()
