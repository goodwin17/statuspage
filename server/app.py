from flask import Flask, request, jsonify
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

@app.route("/api/services", methods=["GET", "POST"]) # get all services
def api_services():
    if request.method == "GET":
        services = db.session.query(Service).all()
        return jsonify(services)
    
    data = request.get_json()
    service = Service(
        name=data["name"],
        url=data["url"],
        check_mode=data["check-mode"],
        check_frequency=data["check-frequency"],
        monitoring_status=data["monitoring-status"]
    )

    try:
        db.session.add(service)
    except:
        return jsonify({"msg": "service already exist"}), 500
    
    db.session.commit()
    return jsonify({"msg": "service added"}), 200

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
