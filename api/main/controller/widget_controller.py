from flask import request
from flask_restplus import Resource, Namespace

from ..service import widget_service

from . import api_model

namespace = Namespace(
    name='widget',
    path='/widget',
    description='widget related operations'
)


@namespace.route('')
class WidgetList(Resource):

    @namespace.marshal_list_with(api_model.widget, envelope='widgets')
    def get(self):
        """List of all widgets"""
        return [w.marshal() for w in widget_service.get_all_widgets()], 200

    @namespace.response(201, 'Widget successfully created.')
    @namespace.expect(api_model.widget_new, validate=True)
    def post(self):
        """Creates a new Widget"""
        data = request.json
        return widget_service.create_new_widget(data=data), 201


@namespace.route('/<public_id>')
@namespace.param('public_id', 'The Widget Identifier')
class Widget(Resource):

    @namespace.marshal_with(api_model.widget, envelope='widget')
    def get(self, public_id):
        """
        Gets widget given public_id
        :param public_id:
        :return:
        """
        return widget_service.get_a_widget(public_id), 200


@namespace.route('/types')
class WidgetTypes(Resource):

    @namespace.marshal_with(api_model.widget_type, as_list=True, envelope='types')
    def get(self):
        return widget_service.get_types(), 200
