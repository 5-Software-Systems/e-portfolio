from api.main import create_app, db

from api.main.service.user_service import create_new_user

from api.main.model import *

app = create_app()


def main():
    with app.app_context():
        a = WidgetBase.query.filter_by(id=1).first()


def save(obj):
    db.session.add(obj)
    db.session.commit()


def create():
    with app.app_context():
        db.create_all()

        create_new_user({
            "email": "fraserbasil@gmail.com",
            "name_first": "Fraser",
            "name_last": "Langton",
            "password": "password"
        })

        create_new_user({
            "email": "flangton@student.unimelb.edu.au",
            "name_first": "Fraser",
            "name_last": "Langton",
            "password": "password"
        })

        a = WidgetAbout(user_id=1, about="test, PLEASE WORK!!")
        i = WidgetImage(user_id=1, image=123)
        save(a)
        save(i)


if __name__ == '__main__':
    main()
