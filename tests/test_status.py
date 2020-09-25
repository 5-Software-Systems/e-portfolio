def test_status(app, client):
    res = client.get('/api/status')
    assert res.status_code == 200
    assert b'"ok"' in res.data
