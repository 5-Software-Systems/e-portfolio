from flask_restplus import Resource, Namespace

api = Namespace('test')


@api.route('/test1')
class Test1(Resource):
    """
    Play around here
    """

    def get(self):
        return {'response': 'test'}
