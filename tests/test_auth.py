import json
from urllib import parse

from .test_user import create_user, get_headers, user_data


####################################################
############## TEST FUNCTIONS ######################
####################################################

# /auth/login
def test_login(app, client):
    login_res, user_res = login_verify(app, client)
    assert login_res.status_code == 200


# /auth/logout
def test_logout(app, client):
    login_res, user_res = login_verify(app, client)
    assert login_res.status_code == 200

    auth = json.loads(login_res.data)['Authorization']
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(auth)})
    res = client.post('/api/auth/logout', headers=headers)
    assert res.status_code == 200


# /auth/user
def test_check_token(app, client):
    login_res, user_res = login_verify(app, client)

    auth = json.loads(login_res.data)['Authorization']
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(auth)})
    res = client.get('/api/auth/user', headers=headers)

    assert res.status_code == 200


def test_forgot_password(app, client):
    res = forgot_password(app, client)

    assert res.status_code == 200


def test_reset_password(app, client):
    login_res, user_res = login_verify(app, client)

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
    login_res, user_res = login(app, client)
    assert login_res.status_code == 200

    verify_link = json.loads(login_res.data)['Authorization']
    parsed = parse.urlparse(verify_link)
    auth = parse.parse_qs(parsed.query)['auth'][0]

    res = verify(app, client, auth)

    assert res.status_code == 200


####################################################
############ HELPER FUNCTIONS ######################
####################################################

def login_verify(app, client):
    res, user_res = login(app, client)

    verify_link = json.loads(res.data)['Authorization']
    parsed = parse.urlparse(verify_link)
    auth = parse.parse_qs(parsed.query)['auth'][0]

    res = verify(app, client, auth)

    return res, user_res


def login(app, client):
    user_res = create_user(app, client)
    assert user_res.status_code == 201

    res = client.post('/api/auth/login', data=json.dumps(user_data), headers=get_headers())
    return res, user_res


def verify(app, client, token):
    headers = get_headers()
    headers.update({'Authorization': 'Bearer {}'.format(token)})

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
