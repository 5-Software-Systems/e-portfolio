from flask import request
from flask_restplus import Resource, Namespace

from ..service import user_service, portfolio_service

from . import api_model

namespace = Namespace(
    name='user',
    path='/user',
    description='user related operations'
)


@namespace.route('')
class UserList(Resource):

    @namespace.marshal_with(api_model.user_basic, as_list=True, envelope='users')
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @namespace.response(201, 'User successfully created.')
    @namespace.expect(api_model.user_new, validate=True)
    @namespace.marshal_with(api_model.user_basic, envelope='users')
    def post(self):
        """Creates a new User"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return user_service.create_new_user(data=data), 201


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The User identifier')
class User(Resource):

    @namespace.marshal_with(api_model.user_basic, envelope='user')
    def get(self, public_id):
        """get a user given its identifier"""
        return user_service.get_a_user(public_id), 200


@namespace.route('/<public_id>/portfolio')
@namespace.param('public_id', 'The User identifier')
class PortfolioList(Resource):

    @namespace.marshal_list_with(api_model.portfolio_basic, envelope='portfolios')
    def get(self, public_id):
        """List all user Portfolios"""
        return portfolio_service.get_all_portfolios(public_id), 200

    @namespace.expect(api_model.portfolio_new, validate=True)
    def post(self, user_public_id):
        """Creates a new Portfolio for a user"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return portfolio_service.create_a_portfolio(user_public_id, data), 201


@namespace.route('/<public_id>/portfolio/<portfolio_public_id>')
@namespace.param('portfolio_public_id', 'The Portfolio identifier')
@namespace.param('public_id', 'The User identifier')
class Portfolio(Resource):

    @namespace.marshal_with(api_model.portfolio, envelope='portfolio')
    def get(self, public_id, portfolio_public_id):
        """get a Portfolio given its identifier"""
        return portfolio_service.get_a_portfolio(public_id, portfolio_public_id), 200
