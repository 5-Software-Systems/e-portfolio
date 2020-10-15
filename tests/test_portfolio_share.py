import json

from .helper import share_portfolio, parse, get_headers


def test_get_share_portfolio_link(app, client):
    res = share_portfolio(app, client)
    assert res.status_code == 201


def test_get_share_portfolio(app, client):
    res = share_portfolio(app, client)
    assert res.status_code == 201

    parsed = parse.urlparse(res.json['link'])
    portfolio_public_id = parse.parse_qs(parsed.query)['portfolio'][0]
    auth = parse.parse_qs(parsed.query)['auth'][0]

    res = client.get(f'/api/portfolio_share/{portfolio_public_id}', headers=get_headers(auth))
    assert res.status_code == 200
