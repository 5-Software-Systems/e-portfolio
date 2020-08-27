from flask import request
from flask_restplus import Resource

from ..service import user_service, portfolio_service

from . import api_model

namespace = api_model.User.namespace


@namespace.route('')
class UserList(Resource):

    @namespace.marshal_with(api_model.User.user_list, as_list=True, envelope='users')
    def get(self):
        """List all registered users"""
        return user_service.get_all_users()

    @namespace.response(201, 'User successfully created.')
    @namespace.expect(api_model.User.new_user, validate=True)
    @namespace.marshal_with(api_model.User.user_creation)
    def post(self):
        """Creates a new User"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return user_service.create_new_user(data=data)


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The User identifier')
class User(Resource):

    @namespace.marshal_with(api_model.User.user, envelope='user')
    def get(self, public_id):
        """get a new_user given its identifier"""
        return user_service.get_a_user(public_id)


@namespace.route('/<public_id>/portfolio')
@namespace.param('public_id', 'The User identifier')
class PortfolioList(Resource):

    @namespace.marshal_list_with(api_model.User.portfolio_list, envelope='portfolios')
    def get(self, public_id):
        """List all Portfolios"""
        return portfolio_service.get_all_portfolios(public_id)

    @namespace.expect(api_model.User.new_portfolio, validate=True)
    def post(self, user_public_id):
        """Creates a new Portfolio"""
        data = request.json
        # TODO Validation https://aviaryan.com/blog/gsoc/restplus-validation-custom-fields
        return {}, 201


@namespace.route('/<public_id>/portfolio/<portfolio_public_id>')
@namespace.param('public_id', 'The User identifier')
@namespace.param('portfolio_public_id', 'The Portfolio identifier')
class Portfolio(Resource):

    @namespace.marshal_with(api_model.User.portfolio, envelope='portfolio')
    def get(self, public_id, portfolio_public_id):
        """get a Portfolio given its identifier"""
        return portfolio_service.get_a_portfolio(public_id, portfolio_public_id)
