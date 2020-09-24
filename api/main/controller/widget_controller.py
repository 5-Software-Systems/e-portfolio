from flask import request
from flask_restplus import Resource, Namespace

from ..service import widget_service, user_service, portfolio_service

from . import api_model

namespace = Namespace(
    name='widget',
    path='/',
    description='Widget related operations'
)


@namespace.route('/portfolio/<public_id>/widget')
@namespace.param('public_id', 'The Portfolio identifier')
class PortfolioWidget(Resource):

    @namespace.marshal_with(api_model.widget_list, as_list=True, envelope='widgets')
    def get(self, public_id):
        """List all Portfolio's Widgets"""
        widgets = widget_service.get_all_portfolio_widgets(public_id)
        return [w.marshal() for w in widgets], 200

    @namespace.expect(api_model.widget_new, validate=True)
    @namespace.marshal_with(api_model.widget, envelope='widget')
    def post(self, public_id):
        """Create a new Widget"""
        data = request.json
        portfolio = portfolio_service.get_a_portfolio(public_id)
        data['data']['portfolio_id'] = portfolio.id
        widget = widget_service.create_new_widget(data=data)
        return widget.marshal(), 201


@namespace.route('/widget/<public_id>')
@namespace.param('public_id', 'The Widget identifier')
class Widget(Resource):

    @namespace.marshal_with(api_model.widget, envelope='widget')
    def get(self, public_id):
        """Get a Widget"""
        widget = widget_service.get_a_widget(public_id)
        return widget.marshal(), 200

    @namespace.expect(api_model.widget_update, validate=True)
    @namespace.marshal_with(api_model.widget, envelope='widget')
    def patch(self, public_id):
        """Update a Widget"""
        data = request.json
        widget = widget_service.update_a_widget(public_id=public_id, data=data)
        return widget.marshal(), 200

    @namespace.marshal_with(api_model.response)
    def delete(self, public_id):
        """delete a Widget"""
        res = widget_service.delete_a_widget(public_id)
        return res, 200
