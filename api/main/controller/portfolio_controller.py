from flask import request
from flask_restplus import Resource

from ..service import portfolio_service

from . import api_model

namespace = api_model.Portfolio.namespace


@namespace.route('/<user_public_id>')
@namespace.param('public_id', 'The User identifier')
class PortfolioList(Resource):

    @namespace.marshal_list_with(api_model.Portfolio.portfolio_list, envelope='portfolios')
    def get(self, user_public_id):
        """List all Portfolios"""
        return portfolio_service.get_all_portfolios(user_public_id)

    @namespace.expect(api_model.Portfolio.new_portfolio, validate=True)
    def post(self, user_public_id):
        """Creates a new Portfolio"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return {}, 201


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The Portfolio identifier')
class User(Resource):

    @namespace.marshal_with(api_model.Portfolio.portfolio, envelope='portfolio')
    def get(self, public_id):
        """get a Portfolio given its identifier"""
        return {}, 200
