from io import BytesIO

from flask import send_file

from . import user_service
from ..model import File
from ..util.db import save_db_object
from ..util.exception import *


def save_file(public_id: str, file_name: str, file_binary: bytes):
    user, _ = user_service.get_a_user(public_id)
    if not user:
        raise UserNotFound(public_id)

    file = File(user_id=user.id, file_name=file_name, file_binary=file_binary)
    save_db_object(file)
    return 'created'


def get_file(public_id: str, file_name: str):
    user, _ = user_service.get_a_user(public_id)
    if not user:
        raise UserNotFound(public_id)

    file = File.query.filter_by(user_id=user.id, file_name=file_name).first()
    if not file:
        raise FileNotFound(file_name)

    return send_file(BytesIO(file.file_binary), as_attachment=True, attachment_filename=file.file_name)
