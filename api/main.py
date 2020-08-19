from flask import Flask, render_template, jsonify

app = Flask(
    import_name='__main__',
    static_folder='../app/build/static',
    template_folder='../app/build'
)


@app.route('/')
def index():
    return render_template('index.html', token='Hello World')


@app.route('/test')
def test():
    return jsonify({"test": "this is a test"})


if __name__ == '__main__':
    app.run(debug=True)
