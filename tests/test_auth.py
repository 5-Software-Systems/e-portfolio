import json

from .test_user import create_user, get_headers


####################################################
############## TEST FUNCTIONS ######################
####################################################

# /auth/login
def test_login(app, client):
    login_res, user_res = login(app, client)
    assert login_res.status_code == 200


# # /auth/login
# def test_incorrect_password_login(app, client):
#     res = create_user(app, client)
#     assert res.status_code == 201
#
#     data = {
#         "email": "email",
#         "password": "incorrect_password"
#     }
#
#     res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
#     assert res.status_code == 401
#
#     expected = {
#         "error": "LoginNotFound",
#         "message": "Login details incorrect, check and try again"
#     }
#     assert expected == json.loads(res.get_data(as_text=True))


# # /auth/login
# def test_unknown_user_login(app, client):
#     res = create_user(app, client)
#     assert res.status_code == 201
#
#     data = {
#         "email": "unknown_user",
#         "password": "password"
#     }
#
#     res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
#     assert res.status_code == 404
#
#     expected = {
#         "error": "LoginNotFound",
#         "message": "Login details incorrect, check and try again"
#     }
#     assert expected == json.loads(res.get_data(as_text=True))


# /auth/logout
def test_logout(app, client):
    login_res, user_res = login(app, client)
    assert login_res.status_code == 200

    auth = json.loads(login_res.data)['Authorization']

    res = client.post('/api/auth/logout', headers={'Authorization': 'Bearer {}'.format(auth)})
    assert res.status_code == 200


# /auth/user
def test_check_token(app, client):
    login_res, user_res = login(app, client)

    auth = json.loads(login_res.data)['Authorization']

    res = client.get('/api/auth/user', headers={'Authorization': 'Bearer {}'.format(auth)})

    assert res.status_code == 200


def test_forgot_password(app, client):
    res = forgot_password(app, client)

    assert res.status_code == 200


def test_rest_password(app, client):
    login_res, user_res = login(app, client)

    auth = json.loads(login_res.data)['Authorization']

    new_password = "new_password"
    print(json.loads(user_res.data))
    data = {
        "public_id": json.loads(user_res.data)['user']['public_id'],
        "password": new_password
    }

    res = client.put('api/auth/password_reset', data=json.dumps(data), headers={'Authorization': 'Bearer {}'.format(auth)})

    assert res.status_code == 200


####################################################
############ HELPER FUNCTIONS ######################
####################################################

def login(app, client):
    user_res = create_user(app, client)
    assert user_res.status_code == 201

    data = {
        "email": "email",
        "password": "password"
    }

    res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
    return res, user_res


def forgot_password(app, client):
    user_res = create_user(app, client)

    data = {
        "email": json.loads(user_res.data)['user']['email']
    }

    res = client.post('/api/auth/password_forgot', data=json.dumps(data), headers=get_headers())

    assert res.status_code == 200
    return res
