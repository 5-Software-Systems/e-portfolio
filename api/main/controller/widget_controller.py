from flask import request
from flask_restplus import Resource, Namespace
from flask_restplus import marshal

from ..service import widget_service

from .api_fields import *

from .user_controller import widget

api = Namespace(
    name='widget',
    path='/widget',
    description='widget related operations'
)


widget_creation = api.model(
    name='user_creation',
    model=dict([response_status, response_message])
)


@api.route('')
class WidgetList(Resource):
    @api.marshal_list_with(widget, envelope='widgets')
    def get(self):
        """List of all widgets"""
        return [w.marshal() for w in widget_service.get_all_widgets()]

    @api.response(201, 'Widget successfully created.')
    @api.expect(widget, validate=True)
    @api.marshal_with(widget_creation)
    def post(self):
        """Creates a new Widget"""
        data = request.json
        return widget_service.create_new_widget(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The Widget Identifier')
class Widget(Resource):
    """
    Widget resource contains individual widget data
    """
    @api.marshal_with(widget)
    def get(self, public_id):
        """
        Gets widget given public_id
        :param public_id:
        :return:
        """
        return widget_service.get_a_widget(public_id)


# @api.route('/about')
# class AboutWidget(Resource):
#
#     def post(self):
#         """Creates a new about Widget"""
#         data = request.json
#         widget_service.create_new_widget(data=data)