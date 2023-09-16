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

@app.route("/api/services") # get all services
def api_services():
    return "Services here"

@app.route("/api/services/<id>") # get specific service
def api_services_id(id):
    return f"Specific service (id = {id}) here"

@app.route("/api/incidents") # 'service' parameter is necessary
def api_incidents_service_id():
    return "Incidents here"

@app.route("/api/checks") # 'service' parameter is necessary
def api_checks_service_id():
    return "Checks here"

if __name__ == "__main__":
    app.run(debug=True)
