from flask_restplus import Resource, Namespace

from ..service import test_service

from .api_field import *

namespace = Namespace(
    name='test',
    path='/test',
    description='test/template namespace'
)


@namespace.route('/test1')
class Test1(Resource):
    """
    Play around here
    """

    @namespace.doc('test endpoint1')
    def get(self):
        return test_service.service_test1(), 200


@namespace.route('/test2')
class Test2(Resource):
    """
    Play around here
    """

    @namespace.doc('test endpoint2')
    def get(self):
        return test_service.service_test2(), 200
