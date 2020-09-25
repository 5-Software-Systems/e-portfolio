import json

from .test_portfolio import create_user, create_portfolio, get_headers


####################################################
############## TEST FUNCTIONS ######################
####################################################

def test_create_about_widget(app, client):
    public_id = setupUserPortfolio(app, client)

    res = create_about_widget(app, client, public_id)
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


def test_create_unknown_widget(app, client):
    public_id = setupUserPortfolio(app, client)
    data = {
        "type": "unknown",
        "data": {
            "unknown1": "unknown1",
            "unknown2": "unknown2"
        }
    }
    res = client.post('/api/portfolio/' + public_id + '/widget',
                      data=json.dumps(data),
                      headers=get_headers())
    assert res.status_code == 400

    expected = {
        "error": "RequestError",
        "message": "Widget type not found"
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_create_bad_parameter_widget(app, client):
    public_id = setupUserPortfolio(app, client)
    data = {
        "type": "about",
        "data": {
            "unknown": "unknown"
        }
    }
    res = client.post('/api/portfolio/' + public_id + '/widget',
                      data=json.dumps(data),
                      headers=get_headers())
    # print(res.data)
    assert res.status_code == 400


def test_get_widgets(app, client):
    public_id = setupUserPortfolio(app, client)

    res = create_about_widget(app, client, public_id)
    assert res.status_code == 201

    res = client.get('/api/portfolio/' + public_id + '/widget')
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
    public_id = setupWidget(app, client)

    res = client.get('/api/widget/' + public_id)
    assert res.status_code == 200

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


def test_patch_widget(app, client):
    public_id = setupWidget(app, client)

    data = {
        "data": {
            "about": "patched about"
        }
    }

    res = client.patch('/api/widget/' + public_id, data=json.dumps(data), headers=get_headers())
    assert res.status_code == 200

    expected = {
        "widget": {
            "public_id": public_id,
            "type": "about",
            "location": [1, 2, 3, 4],
            "data": {
                "about": "patched about"
            }
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_patch_widget_wrong_params(app, client):
    public_id = setupWidget(app, client)

    data = {
        "data": {
            "wrong": "wrongly patched about"
        }
    }
    res = client.patch('/api/widget/' + public_id, data=json.dumps(data), headers=get_headers())
    # print(res.data)
    assert res.status_code == 400


def test_delete_widget(app, client):
    public_id = setupWidget(app, client)

    res = client.delete('/api/widget/' + public_id)
    assert res.status_code == 200

    expected = {
        "status": "success",
        "message": "widget deleted"
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_delete_unkown_widget(app, client):
    res = client.delete('/api/widget/unknown')
    assert res.status_code == 404


####################################################
############ HELPER FUNCTIONS ######################
####################################################

def setupUserPortfolio(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
    assert res.status_code == 201

    public_id = json.loads(res.data)['portfolio']['public_id']
    return public_id


def setupWidget(app, client):
    public_id = setupUserPortfolio(app, client)

    res = create_about_widget(app, client, public_id)
    assert res.status_code == 201

    public_id = json.loads(res.data)['widget']['public_id']
    return public_id


def create_about_widget(app, client, public_id):
    data = {
        "type": "about",
        "location": [1, 2, 3, 4],
        "data": {
            "about": "util about"
        }
    }

    res = client.post('/api/portfolio/' + public_id + '/widget',
                      data=json.dumps(data), headers=get_headers())
    return res
