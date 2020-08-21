from api.main import create_app, db

from api.main.service.user_service import create_new_user
from api.main.service.file_service import save_file

from api.main.model import *

from api.main.util.db import save_changes as save

app = create_app()


def main():
    # play()
    # exit()
    create()


def play():

    with app.app_context():
        with open('assets/IMG_4374.JPG', 'rb') as f:
            bites = f.read()
        save_file(2, 'IMG_4374.JPG', bites)

        exit()

        a = WidgetImage.query.filter_by(user_id=1).first()
        print(a)

        u = User.query.filter_by(name_first='Fraser').first()
        print(u.widgets)


def create():
    with app.app_context():
        db.create_all()

        # Users
        u1, _ = create_new_user({
            "email": "fraserbasil@gmail.com",
            "name_first": "Fraser",
            "name_last": "Langton",
            "password": "password"
        })

        u2, _ = create_new_user({
            "email": "flangton@student.unimelb.edu.au",
            "name_first": "Fraser",
            "name_last": "Langton",
            "password": "password"
        })

        # Widgets
        a = WidgetAbout(user_id=1, about="test, PLEASE WORK!!")
        i = WidgetImage(user_id=1, image=123)
        save(a)
        save(i)

        # Files
        with open('assets/IMG_4374.JPG', 'rb') as f:
            image_binary = f.read()

        save_file(u1['public_id'], 'IMG_4374.JPG', image_binary)
        # save_file(u2['public_id'], 'IMG_4374.JPG', image_binary)


if __name__ == '__main__':
    main()
