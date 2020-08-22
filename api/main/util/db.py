from .. import db


def save_db_object(data):
    db.session.add(data)
    db.session.commit()
