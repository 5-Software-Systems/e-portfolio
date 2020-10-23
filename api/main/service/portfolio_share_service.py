import datetime

import sqlalchemy
from flask import request
from requests import PreparedRequest

from . import user_service, auth_service, portfolio_service
from ..model import Portfolio
from ..util.exception import *


def get_a_portfolio(portfolio_public_id):

    portfolio = Portfolio.query.filter_by(public_id=portfolio_public_id).first()

    if not portfolio:
        raise PortfolioNotFound(portfolio_public_id)

    # custom marshalling, portfolio.widget cannot be
    portfolio.widget_list = [w.marshal() for w in portfolio.widgets]
    return portfolio


def share_a_portfolio(user_public_id, portfolio_public_id, data):
    portfolio = portfolio_service.get_a_portfolio(user_public_id, portfolio_public_id)

    auth_token = auth_service.encode_token(
        {'portfolio': portfolio.public_id, 'type': 'share'},
        datetime.timedelta(minutes=data['duration'])
    ).decode()

    req = PreparedRequest()
    host = request.host_url
    req.prepare(url=f'{host}share/{portfolio.public_id}', params={'auth': auth_token})

    return {
        'status': 'success',
        'message': 'portfolio link created',
        'link': req.url,
    }
