import json
from urllib import parse

from .helper import create_login_verify, create_login, verify, forgot_password, get_headers


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
    login_res, user_res = create_login_verify(app, client)

    auth = json.loads(login_res.data)['Authorization']

    new_password = "new_password"

    data = {
        "public_id": json.loads(user_res.data)['user']['public_id'],
        "password": new_password
    }
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(auth)})
    res = client.put('api/auth/password_reset', data=json.dumps(data), headers=headers)

    assert res.status_code == 200


def test_verify(app, client):
    login_res, user_res = create_login(app, client)
    assert login_res.status_code == 200

    verify_link = json.loads(login_res.data)['Authorization']
    parsed = parse.urlparse(verify_link)
    auth = parse.parse_qs(parsed.query)['auth'][0]

    res = verify(app, client, auth)

    assert res.status_code == 200
