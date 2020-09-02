import os

import requests

DATA_DIR = os.path.join(os.path.dirname(__file__), '')

api = 'http://127.0.0.1:5000/api'
status = '{}/status'.format(api)
auth = '{}/auth'.format(api)
user = '{}/user'.format(api)
portfolio = '{}/portfolio'.format(api)
widget = '{}/widget'.format(api)

GET = 'get'
PUT = 'put'
POST = 'post'
PATCH = 'patch'


def test_endpoint(url, method='get', data=None, headers=None, print_res=False, output=None):
    r = requests.request(method, url, headers=headers, json=data)
    print('{:<7}{:<10}{}'.format(r.status_code, method.upper(), url))
    if print_res:
        print(r.text)
    if not 200 <= int(r.status_code) < 300:
        raise Exception(
            '{}\n{}\n\n{} Error\n{}'.format(
                r.request.url, r.request.body,
                r.status_code, r.text
            )
        )
    if output:
        assert output == r.json()
    return r


def run_tests():
    """
    POST resource
    GET list
    GET resource
    PATCH resource
    """

    # STATUS
    test_endpoint(
        status,
        output='ok'
    )

    # USER
    create_user = test_endpoint(
        user,
        POST,
        {"email": "email",
         "name_first": "first_name",
         "name_last": "first_name",
         "password": "password"},

    )
    user_public_id = create_user.json()['user']['public_id']

    list_user = test_endpoint(
        user,
    )

    get_user = test_endpoint(
        '/'.join([user, user_public_id])
    )

    patch_user = test_endpoint(
        '/'.join([user, user_public_id]),
        PATCH,
        {'name_first': "name_first_change"},
    )

    # AUTH
    login = test_endpoint(
        '/'.join([auth, 'login']),
        POST,
        {"email": "email",
         "password": "password"
         },
    )

    check_user = test_endpoint(
        '/'.join([auth, 'user']),
        GET,
        headers={'Authorization': 'Bearer {}'.format(login.json().get('Authorization'))},
    )

    req_reset = test_endpoint(
        '/'.join([auth, 'reset']),
        POST,
        {'email': 'email'},
    )

    # reset_pw = test_endpoint(
    #     '/'.join([auth, 'reset']),
    #     PUT,
    #     {"public_id": check_user.json().get('public_id'),
    #      "password": "password_change"
    #      },
    # )
    #
    # new_login = test_endpoint(
    #     '/'.join([auth, 'login']),
    #     POST,
    #     {"email": "email",
    #      "password": "password_change"
    #      },
    # )

    logout = test_endpoint(
        '/'.join([auth, 'logout']),
        POST,
        headers={'Authorization': 'Bearer {}'.format(login.json().get('Authorization'))},
    )

    # PORTFOLIO
    create_portfolio = test_endpoint(
        '/'.join([user, user_public_id, 'portfolio']),
        POST,
        {'title': 'test_portfolio'}
    )
    portfolio_public_id = create_portfolio.json()['portfolio']['public_id']

    list_portfolio = test_endpoint(
        '/'.join([user, user_public_id, 'portfolio']),
        GET
    )

    get_portfolio = test_endpoint(
        '/'.join([portfolio, portfolio_public_id]),
        GET
    )

    patch_portfolio = test_endpoint(
        '/'.join([portfolio, portfolio_public_id]),
        PATCH,
        {'title': 'test_change'}
    )

    # WIDGET
    create_widget = test_endpoint(
        '/'.join([portfolio, portfolio_public_id, 'widget']),
        POST,
        {"type": "about",
         "data": {"about": "this is about my test"}}
    )
    widget_public_id = create_widget.json()['widget']['public_id']

    widget_list = test_endpoint(
        '/'.join([portfolio, portfolio_public_id, 'widget'])
    )

    get_widget = test_endpoint(
        '/'.join([widget, widget_public_id])
    )

    patch_widget = test_endpoint(
        '/'.join([widget, widget_public_id]),
        PATCH,
        {'about': 'this is a change in my test'}
    )
