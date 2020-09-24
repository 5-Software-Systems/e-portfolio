import sqlalchemy

from . import portfolio_service
from ..model.widgets import *  # not explicitly used, but used in globals().get()
from ..model import WidgetBase
from ..util.exception import WidgetNotFound, RequestError


def get_all_portfolio_widgets(portfolio_public_id):
    portfolio = portfolio_service.get_a_portfolio(portfolio_public_id)
    return portfolio.widgets


def get_a_widget(public_id):
    widget = WidgetBase.query.filter_by(public_id=public_id).first()
    if not widget:
        raise WidgetNotFound(public_id)
    return widget


def create_new_widget(data):
    widget_class = globals().get(data['type'].title())
    if widget_class is None:
        raise RequestError('Widget type not found')
    try:
        widget = widget_class(**data['data'])
        widget.save()
    except sqlalchemy.exc.IntegrityError:
        raise RequestError('Data parameters missing')
    return widget


def update_a_widget(public_id, data: dict):
    widget = get_a_widget(public_id)
    widget_data = data.pop('data', {})
    widget_data.update(data)
    widget.patch(**widget_data)
    widget.save()
    return widget


def delete_a_widget(public_id):
    widget = get_a_widget(public_id)
    widget.delete()
    return {
        'status': 'success',
        'message': 'widget deleted'
    }


def get_types():
    return [
        {'type': 'about',
         'data_fields': ['about']},
        {'type': 'image',
         'data_fields': ['image_url']},
    ]
