from flask import request
from flask_restplus import Resource, Namespace

from .api_fields import *

namespace = Namespace(
    name='portfolio',
    path='/portfolio',
    description='portfolio related operations'
)

widget = namespace.model(
    name='widget',
    model=dict([public_id, widget_type, widget_data])
)
portfolio = namespace.model(
    name='portfolio',
    model=dict([public_id, portfolio_title, ('widgets', fields.List(fields.Nested(widget)))])
)
new_portfolio = namespace.model(
    name='new_portfolio',
    model=dict([portfolio_title])
)


@namespace.route('')
class PortfolioList(Resource):

    @namespace.marshal_list_with(portfolio, envelope='portfolios')
    def get(self):
        """List all Portfolios"""
        return {}, 200

    @namespace.expect(new_portfolio, validate=True)
    def post(self):
        """Creates a new Portfolio"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return {}, 201


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The Portfolio identifier')
class User(Resource):

    @namespace.marshal_with(portfolio, envelope='portfolio')
    def get(self, public_id):
        """get a Portfolio given its identifier"""
        return {}, 200
