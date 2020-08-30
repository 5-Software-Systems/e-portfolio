import json
import os

import sqlalchemy

from ..main import create_app, db

from ..main.service.file_service import save_file

from ..main.model import *

app = create_app()


def reset():
    delete()
    create()


def delete():
    try:
        os.remove(os.path.join(os.path.dirname(__file__), '../eportfolio.db'))
    except FileNotFoundError:
        pass


def create():
    with app.app_context():
        db.create_all()


def populate():
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

        exit()

        # Files
        with open('assets/IMG_4374.JPG', 'rb') as f:
            image_binary = f.read()

        save_file(u1['public_id'], 'IMG_4374.JPG', image_binary)
        save_file(u2['public_id'], 'IMG_4374.JPG', image_binary)
