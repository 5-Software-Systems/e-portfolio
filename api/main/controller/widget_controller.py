from flask import request
from flask_restplus import Resource, Namespace
from flask_restplus import marshal

from ..service import widget_service

from .api_fields import *

api = Namespace(
    name='widget',
    path='/widget',
    description='widget related operations'
)

widget = api.model(
    'widget',
    model=dict([widget_type, widget_data])
)

widget_creation = api.model(
    name='user_creation',
    model=dict([response_status, response_message])
)

@api.route('')
class WidgetList(Resource):
    @api.marshal_list_with(widget, envelope='widgets')
    def get(self):
        return widget_service.get_all_widgets()

    @api.response(201, 'Widget successfully created.')
    @api.expect(widget, validate=True)
    @api.marshal_with(widget_creation)
    def post(self):
        """Creates a new Widget"""
        data = request.json
        return widget_service.create_new_about_widget(data=data)


@api.route('/')
@api.param('widget_id', 'The Widget Identifier')
class Widget(Resource):
    """
    Widget resource contains individual widget data
    """
    @api.marshal_with(widget)
    def get(self, widget_id):
        """
        Gets widget given widget_id
        :param widget_id:
        :return:
        """
        res, code = widget_service.get_a_widget(widget_id)
        if code != 200:
            return res, code
        return {'widget': marshal(res)}

