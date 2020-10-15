from flask import make_response, request
from flask_restplus import Resource, Namespace

from . import api_model
from ..service import file_service
from ..util.decorator import login_token_required

namespace = Namespace(
    name='file',
    path='/user',
    description='file related operations'
)


@namespace.route('/<user_public_id>/<file_name>')
@namespace.param('public_id', 'The User identifier')
@namespace.param('file_name', 'The File identifier')
class File(Resource):

    @namespace.expect(api_model.auth_token_header)
    @login_token_required
    def get(self, user_public_id, file_name):
        """
        This is technically not restful - DOWNLOAD IN SWAGGER WON'T WORK
        """
        response = make_response(file_service.get_file(user_public_id, file_name))
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' % file_name)

        return response, 200

    @namespace.expect(api_model.auth_token_header)
    @login_token_required
    def put(self, user_public_id, file_name):
        """
        This is technically not restful - UPLOAD IN SWAGGER WON'T WORK
        """
        image_binary = request.get_data()
        return file_service.save_file(user_public_id, file_name, image_binary), 201
