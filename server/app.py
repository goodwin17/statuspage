from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "Test"

@app.route("/api")
def api():
    return "Api here"

if __name__ == "__main__":
    app.run(debug=True)
