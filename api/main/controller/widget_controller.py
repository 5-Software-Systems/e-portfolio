from flask import request
from flask_restplus import Resource

from ..service import widget_service

from . import api_model

namespace = api_model.Widget.namespace


@namespace.route('')
class WidgetList(Resource):

    @namespace.marshal_list_with(api_model.Widget.widget, envelope='widgets')
    def get(self):
        """List of all widgets"""
        return [w.marshal() for w in widget_service.get_all_widgets()]

    @namespace.response(201, 'Widget successfully created.')
    @namespace.expect(api_model.Widget.new_widget, validate=True)
    def post(self):
        """Creates a new Widget"""
        data = request.json
        return widget_service.create_new_widget(data=data)


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The Widget Identifier')
class Widget(Resource):

    @namespace.marshal_with(api_model.Widget.widget, envelope='widget')
    def get(self, public_id):
        """
        Gets widget given public_id
        :param public_id:
        :return:
        """
        return widget_service.get_a_widget(public_id)


@namespace.route('/types')
class WidgetTypes(Resource):

    @namespace.marshal_with(api_model.Widget.widget_type, as_list=True)
    def get(self):
        return widget_service.get_types()
