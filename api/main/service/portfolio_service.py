import sqlalchemy

from . import user_service
from ..model import Portfolio
from ..util.exception import *


def get_a_portfolio(public_id):
    portfolio = Portfolio.query.filter_by(public_id=public_id).first()
    if not portfolio:
        raise PortfolioNotFound(public_id)

    # custom marshalling, portfolio.widget cannot be
    portfolio.widget_list = [w.marshal() for w in portfolio.widgets]
    return portfolio


def get_all_user_portfolios(user_public_id):
    user = user_service.get_a_user(user_public_id)
    return user.portfolios


def create_a_portfolio(user_public_id, data):
    user = user_service.get_a_user(user_public_id)

    data['user_id'] = user.id
    try:
        portfolio = Portfolio(**data)
        portfolio.save()
    except sqlalchemy.exc.IntegrityError:
        raise RequestError('Data parameters missing')
    return portfolio


def update_a_portfolio(public_id, data):
    portfolio = get_a_portfolio(public_id)
    portfolio.patch(**data)
    portfolio.save()
    return portfolio


def delete_a_portfolio(public_id):
    portfolio = get_a_portfolio(public_id)
    portfolio.delete()
    return {
        'status': 'success',
        'message': 'portfolio deleted'
    }

