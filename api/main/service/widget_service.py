import sqlalchemy

# not explicitly used, but used in globals().get()
from . import portfolio_service
from ..model.widgets import *
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


def update_a_widget(public_id, data):
    widget = get_a_widget(public_id)
    widget.patch(**data)
    widget.save()
    return widget


def get_types():
    return [
        {'type': 'about',
         'data_fields': ['about']},
        {'type': 'image',
         'data_fields': ['image_url']},
    ]
