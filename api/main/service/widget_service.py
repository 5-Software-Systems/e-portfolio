import sqlalchemy

# not explicitly used, but used in globals().get()
from ..model.widgets import *
from ..model import WidgetBase
from ..util.exception import WidgetNotFound, RequestError


def get_all_widgets():
    return WidgetBase.query.all()


def get_a_widget(public_id):
    widget: WidgetBase = WidgetBase.query.filter_by(public_id=public_id).first()
    if not widget:
        raise WidgetNotFound('Widget {} not found'.format(public_id))
    return widget.marshal(), 200


def create_new_widget(data):
    """
    data = {
        "user_id": 1,
        "about": "This is the test account for Fraser's private email\nMy email for this account is fraserbasil@gmail.com because my middle name is Basil, my dad originally wanted my first name to be Basil, thankfully my mother made sure such silly ideas were never brought to fruition"
    }
    """
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
