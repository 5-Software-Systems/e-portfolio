import sqlalchemy

# not explicitly used, but used in globals().get()
from ..model.widgets import *
from ..model import WidgetBase
from ..util.exception import WidgetNotFound, RequestError


def get_all_widgets():
    return WidgetBase.query.all()


def get_a_widget(public_id):
    widget = WidgetBase.query.filter_by(public_id=public_id).first()
    if not widget:
        raise WidgetNotFound(public_id)
    return widget.marshal(), 200


def create_new_widget(data):
    widget_class = globals().get(data['type'].title())
    if widget_class is None:
        raise RequestError('Widget type not found')
    try:
        new_about_widget = widget_class(**data['data'])
        new_about_widget.save()
    except sqlalchemy.exc.IntegrityError:
        raise RequestError('Data parameters missing')
    return {'status': 'success',
            'message': 'Successfully created',
            }, 201


def get_types():
    return [
        {'type': 'about',
         'data_fields': ['about']},
        {'type': 'image',
         'data_fields': ['image_url']},
    ], 200
