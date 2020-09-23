from flask import request
from flask_restplus import Resource, Namespace

from ..service import portfolio_service, user_service

from . import api_model

namespace = Namespace(
    name='portfolio',
    path='/',
    description='Portfolio related operations'
)


@namespace.route('/user/<public_id>/portfolio')
@namespace.param('public_id', 'The User identifier')
class UserPortfolio(Resource):

    @namespace.marshal_list_with(api_model.portfolio_basic, envelope='portfolios')
    def get(self, public_id):
        """List all User's Portfolios"""
        return portfolio_service.get_all_user_portfolios(public_id), 200

    @namespace.expect(api_model.portfolio_new, validate=True)
    @namespace.marshal_with(api_model.portfolio_basic, envelope='portfolio')
    def post(self, public_id):
        """Create a new Portfolio for a User"""
        data = request.json
        user = user_service.get_a_user(public_id)
        data['user_id'] = user.id
        return portfolio_service.create_a_portfolio(user_public_id=public_id, data=data), 201


@namespace.route('/portfolio/<public_id>')
@namespace.param('public_id', 'The Portfolio identifier')
class Portfolio(Resource):

    @namespace.marshal_with(api_model.portfolio, envelope='portfolio')
    def get(self, public_id,):
        """Get a Portfolio"""
        return portfolio_service.get_a_portfolio(public_id), 200

    @namespace.expect(api_model.portfolio_update)
    @namespace.marshal_with(api_model.portfolio_basic, envelope='portfolio')
    def patch(self, public_id):
        """Update a Portfolio"""
        data = request.json
        return portfolio_service.update_a_portfolio(public_id=public_id, data=data), 200

    @namespace.marshal_with(api_model.response)
    def delete(self, public_id):
        """delete a portfolio"""
        res = portfolio_service.delete_a_portfolio(public_id)
        return res, 200
