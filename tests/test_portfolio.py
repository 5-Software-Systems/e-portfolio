import json

from .helper import create_portfolio, get_headers, set_up_user


def test_create_portfolio(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    public_id = json.loads(res.data)['portfolio']['public_id']

    expected = {
        "portfolio": {
            "public_id": public_id,
            "title": "title"
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_get_portfolios(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    headers = get_headers(auth)

    res = client.get(f'/api/user/{user_public_id}/portfolio', headers=headers)
    assert res.status_code == 200

    public_id = json.loads(res.data)['portfolios'][0]['public_id']
    expected = {
        "portfolios": [
            {
                "public_id": public_id,
                "title": "title"
            }
        ]
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_get_portfolio(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    portfolio_public_id = json.loads(res.data)['portfolio']['public_id']

    headers = get_headers(auth)

    res = client.get(f'/api/user/{user_public_id}/portfolio/{portfolio_public_id}', headers=headers)
    assert res.status_code == 200

    expected = {
        "portfolio": {
            "public_id": portfolio_public_id,
            "title": "title",
            "widget": []
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_patch_portfolio(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    portfolio_public_id = json.loads(res.data)['portfolio']['public_id']

    data = {
        "title": "patched_title"
    }

    headers = get_headers(auth)

    res = client.patch(f'/api/user/{user_public_id}/portfolio/{portfolio_public_id}',
                       data=json.dumps(data), headers=headers)
    assert res.status_code == 200

    expected = {
        'portfolio': {
            'public_id': portfolio_public_id,
            'title': 'patched_title'
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_delete_portfolio(app, client):
    user_public_id, auth = set_up_user(app, client)

    res = create_portfolio(app, client, user_public_id, auth)
    assert res.status_code == 201

    portfolio_public_id = json.loads(res.data)['portfolio']['public_id']

    headers = get_headers(auth)

    res = client.delete(f'/api/user/{user_public_id}/portfolio/{portfolio_public_id}',
                        headers=headers)
    assert res.status_code == 200

    expected = {
        "status": "success",
        "message": "portfolio deleted"
    }
    assert expected == json.loads(res.get_data(as_text=True))
