from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import *

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

db = SQLAlchemy(app)

@app.route("/")
def index():
    return "Test"

@app.route("/api")
def api():
    return "Api here"

if __name__ == "__main__":
    app.run(debug=True)
