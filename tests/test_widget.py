import json

from .helper import get_headers, set_up_user_portfolio, set_up_widget, create_about_widget


def test_create_about_widget(app, client):
    user_public_id, portfolio_public_id, auth = set_up_user_portfolio(app, client)

    res = create_about_widget(app, client, user_public_id, portfolio_public_id, auth)
    assert res.status_code == 201

    public_id = json.loads(res.data)['widget']['public_id']

    expected = {
        "widget": {
            "public_id": public_id,
            "type": "about",
            "location": [1, 2, 3, 4],
            "data": {
                "about": "util about"
            }
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_get_widgets(app, client):
    user_public_id, portfolio_public_id, auth = set_up_user_portfolio(app, client)

    res = create_about_widget(app, client, user_public_id, portfolio_public_id, auth)
    assert res.status_code == 201

    res = client.get(
        f'/api/user/{user_public_id}/portfolio/{portfolio_public_id}/widget', headers=get_headers(auth)
    )
    assert res.status_code == 200

    public_id = json.loads(res.data)['widgets'][0]['public_id']

    expected = {
        "widgets": [
            {
                "public_id": public_id,
                "type": "about",
                "location": [1, 2, 3, 4],
                "data": {
                    "about": "util about"
                }
            }
        ]
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_get_a_widget(app, client):
    user_public_id, portfolio_public_id, widget_public_id, auth = set_up_widget(app, client)

    res = client.get(
        f'/api/user/{user_public_id}/widget/{widget_public_id}', headers=get_headers(auth)
    )
    assert res.status_code == 200

    expected = {
        "widget": {
            "public_id": widget_public_id,
            "type": "about",
            "location": [1, 2, 3, 4],
            "data": {
                "about": "util about"
            }
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_patch_widget(app, client):
    user_public_id, portfolio_public_id, widget_public_id, auth = set_up_widget(app, client)

    data = {
        "data": {
            "about": "patched about"
        }
    }

    res = client.patch(
        f'/api/user/{user_public_id}/widget/{widget_public_id}',
        data=json.dumps(data), headers=get_headers(auth)
    )
    assert res.status_code == 200

    expected = {
        "widget": {
            "public_id": widget_public_id,
            "type": "about",
            "location": [1, 2, 3, 4],
            "data": {
                "about": "patched about"
            }
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_delete_widget(app, client):
    user_public_id, portfolio_public_id, widget_public_id, auth = set_up_widget(app, client)

    res = client.delete(f'/api/user/{user_public_id}/widget/{widget_public_id}', headers=get_headers(auth))
    assert res.status_code == 200

    expected = {
        "status": "success",
        "message": "widget deleted"
    }
    assert expected == json.loads(res.get_data(as_text=True))
