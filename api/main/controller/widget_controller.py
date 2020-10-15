from flask import request
from flask_restplus import Resource, Namespace

from ..service import widget_service, user_service, portfolio_service

from . import api_model
from ..util.decorator import login_token_required

namespace = Namespace(
    name='widget',
    path='/',
    description='Widget related operations'
)


@namespace.route('/user/<user_public_id>/portfolio/<portfolio_public_id>/widget')
@namespace.param('user_public_id', 'The User identifier')
@namespace.param('portfolio_public_id', 'The Portfolio identifier')
class PortfolioWidget(Resource):

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.widget_list, as_list=True, envelope='widgets')
    @login_token_required
    def get(self, user_public_id, portfolio_public_id):
        """List all Portfolio's Widgets"""
        widgets = widget_service.get_all_portfolio_widgets(portfolio_public_id)
        return [w.marshal() for w in widgets], 200

    @namespace.expect(api_model.widget_new, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.widget, envelope='widget')
    @login_token_required
    def post(self, user_public_id, portfolio_public_id):
        """Create a new Widget"""
        data = request.json
        portfolio = portfolio_service.get_a_portfolio(portfolio_public_id)
        data['data']['portfolio_id'] = portfolio.id
        widget = widget_service.create_new_widget(data=data)
        return widget.marshal(), 201


@namespace.route('/user/<user_public_id>/widget/<widget_public_id>')
@namespace.param('user_public_id', 'The User identifier')
@namespace.param('portfolio_public_id', 'The Portfolio identifier')
class Widget(Resource):

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.widget, envelope='widget')
    @login_token_required
    def get(self, user_public_id, widget_public_id):
        """Get a Widget"""
        widget = widget_service.get_a_widget(widget_public_id)
        return widget.marshal(), 200

    @namespace.expect(api_model.widget_update, api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.widget, envelope='widget')
    @login_token_required
    def patch(self, user_public_id, widget_public_id):
        """Update a Widget"""
        data = request.json
        widget = widget_service.update_a_widget(public_id=widget_public_id, data=data)
        return widget.marshal(), 200

    @namespace.expect(api_model.auth_token_header, validate=True)
    @namespace.marshal_with(api_model.response)
    @login_token_required
    def delete(self, user_public_id, widget_public_id):
        """delete a Widget"""
        res = widget_service.delete_a_widget(widget_public_id)
        return res, 200


@namespace.route('/widget/types')
class WidgetTypes(Resource):

    def get(self):
        return widget_service.get_types()
