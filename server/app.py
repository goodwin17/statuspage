from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import *
from utils import serialize
from flask_jwt_extended import JWTManager, create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

db = SQLAlchemy(app)
jwt = JWTManager(app)

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
        return jsonify([serialize(service) for service in services])
    
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
        return jsonify({"message": "service already exist"}), 500
    
    db.session.commit()
    return jsonify({"message": "service added"}), 200

@app.route("/api/services/<id>") # get specific service
def api_services_id(id):
    return f"Specific service (id = {id}) here"

@app.route("/api/incidents", methods=["GET"]) # 'service' parameter is necessary
def api_incidents_service_id():
    service_id = request.args.get("service_id")

    if service_id is None:
        return jsonify({"message": "no service_id url argument"}), 400
    
    incidents = db.session.query(Incident).filter_by(service_id=service_id).all()
    return jsonify([serialize(incident) for incident in incidents])

@app.route("/api/checks") # 'service' parameter is necessary
def api_checks_service_id():
    return "Checks here"

@app.route("/api/login", methods=["POST"])
def api_login():
    login = request.json.get("login")
    password = request.json.get("password")
    user = db.session.query(User).filter_by(login=login).one_or_none()

    if user is None:
        return jsonify({ "message": "no such user" }), 401

    password_hash = generate_password_hash(password + user.password_salt)

    if password_hash != user.password_hash:
        return jsonify({ "message": "wrong password" }), 401
    
    token = create_access_token(login) # todo

    return jsonify({ "token": token })

if __name__ == "__main__":
    app.run(debug=True)
