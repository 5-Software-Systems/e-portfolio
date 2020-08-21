from flask_restplus import Resource, Namespace

from ..service import test_service

from .api_fields import *


api = Namespace(
    name='test',
    path='/test',
    description='test/template namespace'
)


@api.route('/test1')
class Test1(Resource):
    """
    Play around here
    """

    @api.doc('test endpoint1')
    def get(self):
        return test_service.service_test1()


@api.route('/test2')
class Test2(Resource):
    """
    Play around here
    """

    @api.doc('test endpoint2')
    def get(self):
        return test_service.service_test2()
