from flask import render_template

from api.main import create_api
from api import blueprint

app = create_api()
app.register_blueprint(blueprint, url_prefix='/api')


@app.route('/')
def index():
    return render_template('index.html', token='Hello World')


if __name__ == '__main__':
    app.run(debug=True)
