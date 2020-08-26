from flask import request
from flask_restplus import Resource, Namespace

from ..service import widget_service

from .api_fields import *

namespace = Namespace(
    name='widget',
    path='/widget',
    description='widget related operations'
)

widget = namespace.model(
    name='widget',
    model=dict([public_id, widget_type, widget_data])
)
new_widget = namespace.model(
    name='new_widget',
    model=dict([widget_type, widget_data])
)

widget_type = namespace.model(
    name='widget_type',
    model=dict([widget_type, ('data_fields', fields.List(fields.String()))])
)


@namespace.route('')
class WidgetList(Resource):

    @namespace.marshal_list_with(widget, envelope='widgets')
    def get(self):
        """List of all widgets"""
        return [w.marshal() for w in widget_service.get_all_widgets()]

    @namespace.response(201, 'Widget successfully created.')
    @namespace.expect(new_widget, validate=True)
    def post(self):
        """Creates a new Widget"""
        data = request.json
        return widget_service.create_new_widget(data=data)


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The Widget Identifier')
class Widget(Resource):

    @namespace.marshal_with(widget, envelope='widget')
    def get(self, public_id):
        """
        Gets widget given public_id
        :param public_id:
        :return:
        """
        return widget_service.get_a_widget(public_id)


@namespace.route('/types')
class WidgetTypes(Resource):

    @namespace.marshal_list_with(widget_type)
    def get(self):
        return widget_service.get_types()
