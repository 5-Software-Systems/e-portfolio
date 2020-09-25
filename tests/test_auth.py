import json

from .test_user import create_user, get_headers


####################################################
############## TEST FUNCTIONS ######################
####################################################

def test_login(app, client):
    res = login(app, client)
    assert res.status_code == 200


def test_incorrect_password_login(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    data = {
        "email": "email",
        "password": "incorrect_password"
    }

    res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
    assert res.status_code == 401

    expected = {
        "error": "LoginNotFound",
        "message": "Login details incorrect, check and try again"
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_unknown_user_login(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    data = {
        "email": "unknown_user",
        "password": "password"
    }

    res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
    assert res.status_code == 401

    expected = {
        "error": "LoginNotFound",
        "message": "Login details incorrect, check and try again"
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_logout(app, client):
    res = login(app, client)
    assert res.status_code == 200

    auth = json.loads(res.data)['Authorization']

    client.post('/api/auth/logout')
    assert res.status_code == 200


# TODO get this to work
# def test_check_token(app, client):
#     res = login(app, client)
#     assert res.status_code == 200
#
#     auth = json.loads(res.data)['Authorization']
#
#     mimetype = 'application/json'
#     headers = {
#         'Content-Type': mimetype,
#         'Accept': mimetype,
#         'Authorization': auth
#     }
#
#     res = client.get('/api/auth/user', headers=headers)
#     print(res.data)
#     assert res.status_code == 200

# TODO find a way to not send emails for password resets
# def test_password_reset(app, client):


####################################################
############ HELPER FUNCTIONS ######################
####################################################
def login(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    data = {
        "email": "email",
        "password": "password"
    }

    res = client.post('/api/auth/login', data=json.dumps(data), headers=get_headers())
    return res
