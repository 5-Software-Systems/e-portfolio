from flask_restplus import Resource, Namespace

api = Namespace(
    name='status',
    path='/',
    description='get api status'
)


@api.route('/status')
class Status(Resource):

    @api.doc('get status')
    def get(self):
        return 'ok', 200
