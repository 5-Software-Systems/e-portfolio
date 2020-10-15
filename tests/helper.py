import json
from urllib import parse


user_data = {
    "email": "email@mail.com",
    "name_first": "first_name",
    "name_last": "last_name",
    "password": "password"
}


def create_login_verify(app, client):
    auth_res, user_res = create_login(app, client)

    verify_link = json.loads(auth_res.data)['Authorization']
    parsed = parse.urlparse(verify_link)
    auth = parse.parse_qs(parsed.query)['auth'][0]

    auth_res = verify(app, client, auth)

    return auth_res, user_res


def create_login(app, client):
    user_res = create_user(app, client)
    assert user_res.status_code == 201

    auth_res = client.post('/api/auth/login', data=json.dumps(user_data), headers=get_headers())
    return auth_res, user_res


def verify(app, client, auth):
    headers = get_headers()
    headers.update({'Authorization': f'Bearer {auth}'})

    res = client.put('api/auth/verify', data=json.dumps(user_data), headers=headers)

    return res


def forgot_password(app, client):
    user_res = create_user(app, client)

    data = {
        "email": json.loads(user_res.data)['user']['email']
    }

    res = client.post('/api/auth/password_forgot', data=json.dumps(data), headers=get_headers())

    assert res.status_code == 200
    return res


def create_portfolio(app, client, user_public_id, auth):
    data = {
        "title": "title"
    }

    headers = get_headers(auth)

    res = client.post(f'/api/user/{user_public_id}/portfolio',
                      data=json.dumps(data), headers=headers)
    return res


def get_headers(auth=None):
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    if auth:
        headers.update({'Authorization': f'Bearer {auth}'})

    return headers


def create_user(app, client):
    res = client.post('/api/user', data=json.dumps(user_data), headers=get_headers())
    return res


def set_up_user(app, client):
    auth_res, user_res = create_login_verify(app, client)
    user_public_id = user_res.json['user']['public_id']
    auth = auth_res.json['Authorization']

    return user_public_id, auth


def set_up_user_portfolio(app, client):
    auth_res, user_res = create_login_verify(app, client)
    assert user_res.status_code == 201
    assert auth_res.status_code == 200

    user_public_id = json.loads(user_res.data)['user']['public_id']
    auth = json.loads(auth_res.data)['Authorization']

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    portfolio_public_id = json.loads(res.data)['portfolio']['public_id']

    return user_public_id, portfolio_public_id, auth


def set_up_widget(app, client):
    user_public_id, portfolio_public_id, auth = set_up_user_portfolio(app, client)

    res = create_about_widget(app, client, user_public_id, portfolio_public_id, auth)
    assert res.status_code == 201

    widget_public_id = json.loads(res.data)['widget']['public_id']
    return user_public_id, portfolio_public_id, widget_public_id, auth


def create_about_widget(app, client, user_public_id, portfolio_public_id, auth):
    data = {
        "type": "about",
        "location": [1, 2, 3, 4],
        "data": {
            "about": "util about"
        }
    }

    res = client.post(f'/api/user/{user_public_id}/portfolio/{portfolio_public_id}/widget',
                      data=json.dumps(data), headers=get_headers(auth))
    return res
