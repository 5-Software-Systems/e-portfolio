import json

user_data = {
    "email": "email@mail.com",
    "name_first": "first_name",
    "name_last": "last_name",
    "password": "password"
}


####################################################
############## TEST FUNCTIONS ######################
####################################################

def test_get_users(app, client):
    res = client.get('/api/user')
    assert res.status_code == 200
    assert b'\"users\":' in res.data


def test_create_user(app, client):
    res = create_user(app, client)
    assert res.status_code == 201


def test_get_a_user(app, client):
    # First create a user
    r = create_user(app, client)
    assert r.status_code == 201

    # Get the unique creation attributes
    public_id = json.loads(r.data)['user']['public_id']
    registered_on = json.loads(r.data)['user']['registered_on']

    # Get the created user
    res = client.get('/api/user/' + public_id)
    assert res.status_code == 200
    expected = {
        "user": {
            "public_id": public_id,
            "email": "email@mail.com",
            "name_first": "first_name",
            "name_last": "last_name",
            "registered_on": registered_on
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_patch_user(app, client):
    r = create_user(app, client)
    assert r.status_code == 201

    public_id = json.loads(r.data)['user']['public_id']
    registered_on = json.loads(r.data)['user']['registered_on']

    data = {
        "email": "patched_email",
        "name_first": "patched_first_name",
        "name_last": "patched_last_name"
    }

    res = client.patch('/api/user/' + public_id, data=json.dumps(data), headers=get_headers())
    assert res.status_code == 200

    expected = {
        "user": {
            "public_id": public_id,
            "email": "patched_email",
            "name_first": "patched_first_name",
            "name_last": "patched_last_name",
            "registered_on": registered_on
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


####################################################
############ HELPER FUNCTIONS ######################
####################################################

def get_headers():
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    return headers


def create_user(app, client):
    res = client.post('/api/user', data=json.dumps(user_data), headers=get_headers())
    return res
