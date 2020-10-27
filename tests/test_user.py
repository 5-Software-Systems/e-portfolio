import json

from tests.helper import get_headers, create_user, set_up_user


def test_get_users(app, client):
    res = client.get('/api/user')
    assert res.status_code == 200
    assert b'\"users\":' in res.data


def test_create_user(app, client):
    res = create_user(app, client)
    assert res.status_code == 201


def test_get_a_user(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = client.get(f'/api/user/{user_public_id}', headers=get_headers(auth))
    assert res.status_code == 200


def test_patch_user(app, client):
    user_public_id, auth = set_up_user(app, client)

    data = {
        "email": "patched_email",
        "name_first": "patched_first_name",
        "name_last": "patched_last_name"
    }

    res = client.patch(f'/api/user/{user_public_id}',
                       data=json.dumps(data), headers=get_headers(auth))
    assert res.status_code == 200

    expected = {
        "user": {
            "public_id": user_public_id,
            "email": "patched_email",
            "name_first": "patched_first_name",
            "name_last": "patched_last_name",
        }
    }
    assert expected == {
        'user': {
            k: v for k, v in json.loads(res.get_data(as_text=True))['user'].items()
            if k in expected['user'].keys()
        }
    }
