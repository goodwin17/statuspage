from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from models import *
from utils import serialize
from flask_jwt_extended import JWTManager, create_access_token, unset_jwt_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from secrets import token_hex

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["JWT_SECRET_KEY"] = "secret"

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
        return jsonify({"message": "service already exist"}), 409
    
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

    response = make_response({ "message": "successfully logged in" }, status=200)
    response.headers['Authorization'] = f'Bearer {token}'

    return response


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.form.to_dict()

    if db.session.query(User).filter_by(login=data["login"]).one_or_none():
        return jsonify(message="user already exists"), 409

    new_user = User(
        name=data["name"],
        login=data["login"],
        password_hash=generate_password_hash(data["password"], salt_length=32),
        password_salt="",
        role=data["role"]
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="user added"), 200


if __name__ == "__main__":
    app.run(debug=True)
