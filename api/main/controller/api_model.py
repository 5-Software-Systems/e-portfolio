from flask_restplus import Namespace

from .api_field import *


class Auth:
    namespace = Namespace(
        name='auth',
        path='/auth',
        description='authentication related operations'
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
    auth_token_header.add_argument('Authorization', type=str, location='headers')


class User:
    namespace = Namespace(
        name='user',
        path='/user',
        description='user related operations'
    )
    portfolio_brief = namespace.model(
        name='portfolio_brief',
        model=dict([public_id, portfolio_title])
    )
    new_user = namespace.model(
        name='new_user',
        model=dict([email, name_first, name_last, password])
    )
    user_creation = namespace.model(
        name='user_creation',
        model=dict([response_status, response_message, public_id, auth_token])
    )
    user_list = namespace.model(
        name='user_list',
        model=dict([public_id, email, name_first, name_last])
    )
    user = namespace.model(
        name='user',
        model=dict([
            public_id, email, name_first, name_last, ('portfolios', fields.List(fields.Nested(portfolio_brief)))
        ])
    )
    new_portfolio = namespace.model(
        name='new_portfolio',
        model=dict([portfolio_title])
    )
    portfolio_list = namespace.model(
        name='portfolio_list',
        model=dict([public_id, portfolio_title])
    )
    widget = namespace.model(
        name='widget_list',
        model=dict([public_id, widget_type, widget_data])
    )
    portfolio = namespace.model(
        name='portfolio',
        model=dict(
            [public_id, portfolio_title, ('widget', fields.List(fields.Nested(widget), attribute='widget_list'))])
    )


class Widget:
    namespace = Namespace(
        name='widget',
        path='/widget',
        description='widget related operations'
    )
    widget = namespace.model(
        name='widget',
        model=dict([public_id, widget_type, widget_data])
    )
    new_widget = namespace.model(
        name='new_widget',
        model=dict([widget_type, widget_data])
    )
    widget_type = namespace.model(
        name='widget_type',
        model=dict([widget_type, ('data_fields', fields.List(fields.String()))])
    )
