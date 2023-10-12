from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, unset_jwt_cookies,\
    jwt_required, set_access_cookies, verify_jwt_in_request,\
    get_jwt_identity, create_refresh_token, set_refresh_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from utils import serialize, serialize_all, convert_dict_notation
from flask_cors import CORS
import atexit

app = Flask(__name__)
app.config.from_pyfile("config.py")
jwt = JWTManager(app)
CORS(app)

from monitor import Monitor
from models import db, User, Service, Incident, UserRole, CheckMethod

service_monitor = Monitor()


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


@app.route("/api/services", methods=["GET", "POST"])
def api_services():
    if request.method == "GET":
        services = db.session.query(Service).all()
        return jsonify(serialize_all(services))
    
    verify_jwt_in_request()
    data = request.get_json()
    check_method = CheckMethod.get(data["check-method"])

    if check_method is None:
        return jsonify({ "msg": "no such check method"}), 400

    try:
        service = Service(
            name=data["name"],
            address=data["address"],
            check_method=check_method,
            check_interval=data["check-interval"],
            monitoring_status=data["monitoring-status"]
        )
        db.session.add(service)
        db.session.commit()
    except:
        return jsonify({ "msg": "service already exists" }), 409
    
    service_monitor.add(service)
    return jsonify({ "msg": "service created" })


@app.route("/api/services/<id>", methods=["GET", "PUT", "DELETE"])
def api_services_id(id):
    service_query_filter = db.session.query(Service).filter_by(id=id)
    service = service_query_filter.one_or_none()
    
    if service is None:
        return jsonify({ "msg": "no service with such id" }), 400
        
    if request.method == "GET":
        return jsonify(serialize(service))
    
    verify_jwt_in_request()
    data = request.get_json()
    
    if request.method == "PUT":
        try:
            service_query_filter.update(convert_dict_notation(data))
            db.session.commit()
            service_monitor.update(service_query_filter.first())
        except Exception as e:
            return jsonify({ "msg": "can not update service", "error": str(e) }), 500
        
        return jsonify({ "msg": "service updated" })
    
    try:
        service_query_filter.delete()
        db.session.commit()
    except Exception as e:
        return jsonify({ "msg": "can not delete service", "error": str(e) }), 500
    
    return jsonify({ "msg": "service deleted" })


@app.route("/api/services/<id>/change-status", methods=["POST"])
@jwt_required()
def api_services_id_change_status(id):
    service = db.session.query(Service).filter_by(id=id).first()
    
    if service.monitoring_status == 1:
        service.monitoring_status = 0
        db.session.commit()
        service_monitor.stop(id)
    else:
        service.monitoring_status = 1
        db.session.commit()
        service_monitor.start(id)
    
    return jsonify({ "msg": "service monitoring status changed" })


@app.route("/api/incidents", methods=["GET"]) # service-id parameter is necessary
def api_incidents_service_id():
    service_id = request.args.get("service-id")

    if service_id is None:
        return jsonify({ "msg": "no service-id url argument" }), 400
    
    incidents = db.session.query(Incident).filter_by(service_id=service_id).all()
    return jsonify(serialize_all(incidents))


@app.route("/api/checks") # service-id parameter is necessary
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
    
    access_token = create_access_token(user.login)
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
    
    user_role = UserRole.get(data["role"])

    if user_role is None:
        return jsonify({ "msg": "no such role"}), 400
    
    password_hash = generate_password_hash(data["password"], salt_length=64)

    try:
        user = User(
            name=data["name"],
            login=data["login"],
            password_hash=password_hash,
            role=user_role
        )
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        return jsonify({ "msg": "can not create person", "error": str(e) }), 500
    
    return jsonify({ "msg": "user created" })


@app.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def api_refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity)
    response = make_response({ "msg": "successfully logged in" })
    set_access_cookies(response, access_token)
    return response


if __name__ == "__main__":
    with app.app_context():
        db.create_all() # create tables if some do not exist
        service_monitor.run()
    
    atexit.register(lambda: service_monitor.shutdown(wait=False))
    app.run(debug=True, use_reloader=False)
