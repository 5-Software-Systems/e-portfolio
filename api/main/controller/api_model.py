from flask_restplus import Namespace

from .api_field import *

namespace = Namespace('model')


widget = namespace.model(
    name='widget',
    model=dict([public_id, widget_type, widget_data])
)
widget_new = namespace.model(
    name='widget_new',
    model=dict([widget_type, widget_data])
)
widget_list = namespace.model(
    name='widget_list',
    model=dict([public_id, widget_type, widget_data])
)
widget_type = namespace.model(
    name='widget_type',
    model=dict([widget_type, ('data_fields', fields.List(fields.String()))])
)

portfolio_new = namespace.model(
    name='portfolio_new',
    model=dict([portfolio_title])
)
portfolio_basic = namespace.model(
    name='portfolio_basic',
    model=dict([public_id, portfolio_title])
)
portfolio = namespace.model(
    name='portfolio',
    model=dict([public_id, portfolio_title,
                ('widget', fields.List(fields.Nested(widget), attribute='widget_list'))])
)

user_new = namespace.model(
    name='user_new',
    model=dict([email, name_first, name_last, password])
)
user_basic = namespace.model(
    name='user',
    model=dict([public_id, email, name_first, name_last, registered_on])
)
user_change = namespace.model(
    name='user_change',
    model=dict([email, name_first, name_last])
)
user_portfolio = namespace.model(
    name='user_portfolio',
    model=dict([public_id, email, name_first, name_last, registered_on,
                ('portfolios', fields.List(fields.Nested(portfolio_basic)))])
)

user_auth = namespace.model(
    name='auth_details',
    model=dict([email, password])
)
auth_response = namespace.model(
    name='auth_response',
    model=dict([response_status, response_message, auth_token])
)
auth_token = namespace.model(
    name='bearer_auth_token',
    model=dict([bearer_auth_token])
)
auth_token_header = namespace.parser()
auth_token_header.add_argument('Authorization', type=str, location='headers', required=True, help='Bearer <token>')
