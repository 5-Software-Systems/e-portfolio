import json
from urllib import parse

from .helper import create_login_verify, create_login, verify, forgot_password, get_headers, user_data


# /auth/login
def test_login(app, client):
    login_res, user_res = create_login_verify(app, client)
    assert login_res.status_code == 200


# /auth/logout
def test_logout(app, client):
    login_res, user_res = create_login_verify(app, client)
    assert login_res.status_code == 200

    auth = json.loads(login_res.data)['Authorization']
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(auth)})
    res = client.post('/api/auth/logout', headers=headers)
    assert res.status_code == 200


# /auth/user
def test_check_token(app, client):
    login_res, user_res = create_login_verify(app, client)

    auth = json.loads(login_res.data)['Authorization']
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(auth)})
    res = client.get('/api/auth/user', headers=headers)

    assert res.status_code == 200


def test_forgot_password(app, client):
    res = forgot_password(app, client)

    assert res.status_code == 200


def test_reset_password(app, client):
    forgot_res = forgot_password(app, client)

    reset_link = json.loads(forgot_res.data)['link']
    parsed = parse.urlparse(reset_link)
    user_public_id = parse.parse_qs(parsed.query)['user'][0]
    auth = parse.parse_qs(parsed.query)['auth'][0]

    new_password = "new_password"

    data = {
        "public_id": user_public_id,
        "password": new_password
    }

    res = client.post(f'api/user/{user_public_id}/password_reset', data=json.dumps(data), headers=get_headers(auth))

    assert res.status_code == 200


def test_verify(app, client):
    login_res, user_res = create_login(app, client)
    assert login_res.status_code == 200

    verify_link = json.loads(login_res.data)['Authorization']
    parsed = parse.urlparse(verify_link)
    user_public_id = parse.parse_qs(parsed.query)['user'][0]
    auth = parse.parse_qs(parsed.query)['auth'][0]

    res = verify(app, client, user_public_id, auth)

    assert res.status_code == 200
