from flask import make_response, request
from flask_restplus import Resource, Namespace

from . import api_model
from ..service import file_service
from ..util.decorator import token_required

namespace = Namespace(
    name='file',
    path='/',
    description='file related operations'
)


@namespace.route('/user/<user_public_id>/file')
@namespace.param('user_public_id', 'The User identifier')
class Files(Resource):

    @namespace.expect(api_model.auth_token_header)
    @namespace.marshal_with(api_model.file, as_list=True, envelope='files')
    @token_required('user', 'login')
    def get(self, user_public_id):
        """
        Return list of user's files
        """
        return file_service.get_user_files(user_public_id), 200


@namespace.route('/user/<user_public_id>/file/<file_name>')
@namespace.param('user_public_id', 'The User identifier')
@namespace.param('file_name', 'The File identifier')
class File(Resource):

    def get(self, user_public_id, file_name):
        """
        This is technically not restful - DOWNLOAD IN SWAGGER WON'T WORK
        """
        response = make_response(file_service.get_file_bytes(user_public_id, file_name))
        response.headers.set('Content-Type', 'image/jpeg')
        response.headers.set('Content-Disposition', 'attachment', filename='%s.jpg' % file_name)

        return response

    @namespace.expect(api_model.auth_token_header)
    @token_required('user', 'login')
    @namespace.marshal_with(api_model.response)
    @token_required('user', 'login')
    def put(self, user_public_id, file_name):
        """
        This is technically not restful - UPLOAD IN SWAGGER WON'T WORK
        """
        image_binary = request.get_data()
        return file_service.save_file(user_public_id, file_name, image_binary), 201

    @namespace.expect(api_model.auth_token_header)
    @namespace.marshal_with(api_model.response)
    @token_required('user', 'login')
    def delete(self, user_public_id, file_name):
        """
        This is technically not restful - DELETE IN SWAGGER WON'T WORK
        """
        return file_service.delete_a_file(user_public_id, file_name), 200
