import json
from .test_user import create_user, get_headers

####################################################
############## TEST FUNCTIONS ######################
####################################################

def test_create_portfolio(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
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
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
    assert res.status_code == 201

    res = client.get('/api/user/' + public_id + '/portfolio')
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
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
    assert res.status_code == 201

    public_id = json.loads(res.data)['portfolio']['public_id']

    res = client.get('/api/portfolio/' + public_id)
    assert res.status_code == 200

    expected = {
          "portfolio": {
                "public_id": public_id,
                "title": "title",
                "widget": []
          }
    }
    assert expected == json.loads(res.get_data(as_text=True))



def test_patch_portfolio(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
    assert res.status_code == 201

    public_id = json.loads(res.data)['portfolio']['public_id']

    data = {
        "title": "patched_title"
    }

    res = client.patch('/api/portfolio/' + public_id, data=json.dumps(data), headers=get_headers())
    assert res.status_code == 200

    expected = {
        'portfolio': {
            'public_id': public_id,
            'title': 'patched_title'
        }
    }
    assert expected == json.loads(res.get_data(as_text=True))


def test_delete_portfolio(app, client):
    res = create_user(app, client)
    assert res.status_code == 201

    public_id = json.loads(res.data)['user']['public_id']

    res = create_portfolio(app, client, public_id)
    assert res.status_code == 201

    public_id = json.loads(res.data)['portfolio']['public_id']

    res = client.delete('/api/portfolio/' + public_id)
    assert res.status_code == 200

    expected = {
        "status": "success",
        "message": "portfolio deleted"
    }
    assert expected == json.loads(res.get_data(as_text=True))


####################################################
############ HELPER FUNCTIONS ######################
####################################################
def create_portfolio(app, client, public_id):
    data = {
        "title": "title"
    }

    res = client.post('/api/user/' + public_id + '/portfolio',
                      data=json.dumps(data), headers=get_headers())
    return res