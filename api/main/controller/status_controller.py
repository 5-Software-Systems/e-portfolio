from flask_restplus import Resource, Namespace

namespace = Namespace(
    name='status',
    path='/',
    description='get api status'
)


@namespace.route('/status')
class Status(Resource):

    @namespace.doc('get status')
    def get(self):
        return 'ok', 200
