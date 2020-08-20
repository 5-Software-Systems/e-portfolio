from flask import render_template

from api.main import create_app, db
from api import blueprint


app = create_app()
app.register_blueprint(blueprint, url_prefix='/api')


@app.route('/')
def index():
    return render_template('index.html', token='Hello World')


with app.app_context():
    from api.main.model import *
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
