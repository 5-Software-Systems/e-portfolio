import sqlalchemy

from ..model import User, Portfolio
from ..util.exception import *


def get_a_portfolio(user_public_id, portfolio_public_id):
    user = User.query.filter_by(public_id=user_public_id).first()
    if not user:
        raise UserNotFound(user_public_id)

    portfolio = Portfolio.query.filter_by(public_id=portfolio_public_id).first()
    if not portfolio:
        raise PortfolioNotFound(portfolio_public_id)

    widgets = [w.marshal() for w in portfolio.widgets]
    # custom marshalling, portfolio.widget cannot be
    portfolio.widget_list = widgets
    return portfolio


def get_all_portfolios(user_public_id):
    user = User.query.filter_by(public_id=user_public_id).first()
    if not user:
        raise UserNotFound(user_public_id)
    return user.portfolios


def create_a_portfolio(user_public_id, data):
    user = User.query.filter_by(public_id=user_public_id).first()
    if not user:
        raise UserNotFound(user_public_id)

    data['user_id'] = user.id
    try:
        portfolio = Portfolio(**data)
        portfolio.save()
    except sqlalchemy.exc.IntegrityError:
        raise RequestError('Data parameters missing')
    return 'created'
