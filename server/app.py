from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from models import *
from utils import serialize
from flask_jwt_extended import JWTManager, create_access_token, unset_jwt_cookies, jwt_required, set_access_cookies
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.config.from_pyfile("config.py")

db = SQLAlchemy(app)
jwt = JWTManager(app)


@app.route("/")
def index():
    return "Test"


@app.route("/api")
def api():
    return "Api here"

@app.route("/api/protected")
@jwt_required()
def api_protected():
    return "Protected here"


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
        return jsonify({"msg": "service already exist"}), 409
    
    db.session.commit()
    return jsonify({"msg": "service added"})


@app.route("/api/services/<id>") # get specific service
def api_services_id(id):
    service = db.session.query(Service).filter_by(id=id).one_or_none()

    if service is None:
        return jsonify({ "msg": "no service with such id"}), 400
    
    return jsonify(serialize(service))


@app.route("/api/incidents", methods=["GET"]) # 'service' parameter is necessary
def api_incidents_service_id():
    service_id = request.args.get("service_id")

    if service_id is None:
        return jsonify({"msg": "no service_id url argument"}), 400
    
    incidents = db.session.query(Incident).filter_by(service_id=service_id).all()
    return jsonify([serialize(incident) for incident in incidents])


@app.route("/api/checks") # 'service' parameter is necessary
def api_checks_service_id():
    return "Checks here"


@app.route("/api/login", methods=["POST"])
def api_login():
    data = request.get_json()
    user = db.session.query(User).filter_by(login=data["login"]).one_or_none()

    if user is None:
        return jsonify({ "msg": "no such user" }), 401

    if not check_password_hash(user.password_hash, data["password"]):
        return jsonify({ "msg": "wrong password" }), 401
    
    token = create_access_token(data["login"]) # todo

    response = make_response({ "msg": "successfully logged in" })
    set_access_cookies(response, token)

    return response


@app.route("/api/logout", methods=["POST"])
def api_logout():
    response = jsonify({"msg": "successfully logged out"})
    unset_jwt_cookies(response)
    return response


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json()
    print(type(data))

    if db.session.query(User).filter_by(login=data["login"]).one_or_none():
        return jsonify({ "msg": "user already exists" }), 409

    new_user = User(
        name=data["name"],
        login=data["login"],
        password_hash=generate_password_hash(data["password"], salt_length=64),
        role=data["role"]
    )
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({ "msg": "user added" })


if __name__ == "__main__":
    app.run(debug=True)
