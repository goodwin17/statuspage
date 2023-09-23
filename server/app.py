from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from models import *
from utils import serialize
from flask_jwt_extended import JWTManager, create_access_token, unset_jwt_cookies,\
    jwt_required, set_access_cookies, verify_jwt_in_request,\
    get_jwt_identity, create_refresh_token, set_refresh_cookies
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
    
    verify_jwt_in_request()
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
        return jsonify({ "msg": "service already exist" }), 409
    
    db.session.commit()
    return jsonify({ "msg": "service added" })


@app.route("/api/services/<id>", methods=["GET", "PUT", "DELETE"])
def api_services_id(id):
    data = request.get_json()
    service_query = db.session.query(Service).filter_by(id=id)
    service = service_query.one_or_none()
    
    if service is None:
        return jsonify({ "msg": "no service with such id" }), 400
        
    if request.method == "GET":
        return jsonify(serialize(service))
    
    verify_jwt_in_request()
    
    if request.method == "PUT":
        try:
            service_query.update(data)
        except:
            return jsonify({ "msg": "can not update service" })
        
        db.session.commit()
        return jsonify({ "msg": "service updated" })
    
    try:
        service_query.delete()
    except:
        return jsonify({ "msg": "can not delete service" })
    
    db.session.commit()
    return jsonify({ "msg": "service deleted" })


@app.route("/api/incidents", methods=["GET"]) # 'service-id' parameter is necessary
def api_incidents_service_id():
    service_id = request.args.get("service-id")

    if service_id is None:
        return jsonify({ "msg": "no service-id url argument" }), 400
    
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
    
    access_token = create_access_token(user.login) # todo
    refresh_token = create_refresh_token(user.login)
    response = make_response({ "msg": "successfully logged in" })
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    return response


@app.route("/api/logout", methods=["POST"])
def api_logout():
    response = jsonify({ "msg": "successfully logged out" })
    unset_jwt_cookies(response)
    return response


@app.route("/api/register", methods=["POST"])
def api_register():
    data = request.get_json()

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


@app.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def api_refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity)
    response = make_response({ "msg": "successfully logged in" })
    set_access_cookies(response, access_token)
    return response


if __name__ == "__main__":
    app.run(debug=True)
