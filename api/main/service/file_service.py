from io import BytesIO

from flask import send_file

from . import user_service
from ..model import File
from ..util.db import save_db_object


def save_file(public_id: str, file_name: str, file_binary: bytes):
    user, _ = user_service.get_a_user(public_id)
    if not user:
        return {'status': 'fail',
                'message': 'user not found'
                }, 404
    file = File(user_id=user.id, file_name=file_name, file_binary=file_binary)
    save_db_object(file)
    return {'status': 'success',
            'message': 'image uploaded'
            }, 201


def get_file(public_id: str, file_name: str):
    user, _ = user_service.get_a_user(public_id)
    if not user:
        return {'status': 'fail',
                'message': 'user not found'
                }, 404

    file = File.query.filter_by(user_id=user.id, file_name=file_name).first()
    if not file:
        return {'status': 'fail',
                'message': 'file not found'
                }, 404

    return send_file(BytesIO(file.file_binary), as_attachment=True, attachment_filename=file.file_name), 200
