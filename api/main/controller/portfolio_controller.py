from flask import request
from flask_restplus import Resource, Namespace

from ..service import portfolio_service, user_service

from . import api_model
from ..util.decorator import token_required

namespace = Namespace(
    name='portfolio',
    path='/',
    description='Portfolio related operations'
)


@namespace.route('/user/<user_public_id>/portfolio')
@namespace.param('user_public_id', 'The User identifier')
class UserPortfolio(Resource):

    @namespace.expect(api_model.auth_token_header)
    @namespace.marshal_list_with(api_model.portfolio_basic, envelope='portfolios')
    @token_required('user', 'login')
    def get(self, user_public_id):
        """List all User's Portfolios"""
        return portfolio_service.get_all_user_portfolios(user_public_id), 200

    @namespace.expect(api_model.portfolio_new, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.portfolio_basic, envelope='portfolio')
    @token_required('user', 'login')
    def post(self, user_public_id):
        """Create a new Portfolio for a User"""
        data = request.json
        user = user_service.get_a_user(user_public_id)
        data['user_id'] = user.id
        return portfolio_service.create_a_portfolio(user_public_id, data), 201


@namespace.route('/user/<user_public_id>/portfolio/<portfolio_public_id>')
@namespace.param('user_public_id', 'The User identifier')
@namespace.param('portfolio_public_id', 'The Portfolio identifier')
class Portfolio(Resource):

    @namespace.expect(api_model.auth_token_header)
    @namespace.marshal_with(api_model.portfolio, envelope='portfolio')
    @token_required('user', 'login')
    def get(self, user_public_id, portfolio_public_id):
        """Get a Portfolio"""
        return portfolio_service.get_a_portfolio(user_public_id, portfolio_public_id), 200

    @namespace.expect(api_model.portfolio_update, api_model.auth_token_header)
    @namespace.marshal_with(api_model.portfolio_basic, envelope='portfolio')
    @token_required('user', 'login')
    def patch(self, user_public_id, portfolio_public_id):
        """Update a Portfolio"""
        data = request.json
        return portfolio_service.update_a_portfolio(user_public_id, portfolio_public_id, data), 200

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.response)
    @token_required('user', 'login')
    def delete(self, user_public_id, portfolio_public_id):
        """delete a portfolio"""
        res = portfolio_service.delete_a_portfolio(user_public_id, portfolio_public_id)
        return res, 200
