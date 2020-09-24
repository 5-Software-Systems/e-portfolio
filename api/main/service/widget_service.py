import os

import sqlalchemy

from . import portfolio_service
from ..model.widgets import *  # not explicitly used, but used in globals().get()
from ..model import WidgetBase
from ..util.exception import WidgetNotFound, RequestError
from ..util.funcs import rel_path


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
    files = os.listdir(rel_path('../model/widgets', __file__))
    files = map(lambda x: x.replace('.py', ''), files)
    files = filter(lambda f: f not in ['widget', '__init__', '__pycache__'], files)
    types = []
    for file in files:
        obj = globals().get(file.title())
        cols = {col.name: col.type.__str__() for col in filter(lambda col: col.name != 'id', obj.__table__.columns)}
        types.append({'type': file, 'data': cols})
    return types
