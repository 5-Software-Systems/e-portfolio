from ..model import User, Portfolio
from ..util.exception import UserNotFound, ResourceError


def get_a_portfolio(user_public_id, portfolio_public_id):
    user = User.query.filter_by(public_id=user_public_id).first()
    if not user:
        raise UserNotFound('User {} not found'.format(user_public_id))
    portfolios = list(filter(lambda p: p.public_id == portfolio_public_id, user.portfolios))
    if not portfolios:
        raise ResourceError
    portfolio = portfolios.pop()
    widgets = [w.marshal() for w in portfolio.widgets]
    # custom marshalling, portfolio.widget cannot be
    portfolio.widget_list = widgets
    return portfolio, 200


def get_all_portfolios(user_public_id):
    user = User.query.filter_by(public_id=user_public_id).first()
    if not user:
        raise UserNotFound('User {} not found'.format(user_public_id))
    return user.portfolios, 200
