from flask_restplus import Resource, Namespace

from ..service import test_service

from .api_field import *

namespace = Namespace(
    name='util',
    path='/util',
    description='util/template namespace'
)


@namespace.route('/test1')
class Test1(Resource):
    """
    Play around here
    """

    @namespace.doc('util endpoint1')
    def get(self):
        return test_service.service_test1(), 200


@namespace.route('/test2')
class Test2(Resource):
    """
    Play around here
    """

    @namespace.doc('util endpoint2')
    def get(self):
        return test_service.service_test2(), 200
