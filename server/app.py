from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import JWTManager, create_access_token, unset_jwt_cookies,\
    jwt_required, set_access_cookies, verify_jwt_in_request,\
    get_jwt_identity, create_refresh_token, set_refresh_cookies, unset_access_cookies
from werkzeug.security import generate_password_hash, check_password_hash
from utils import deserialize, from_json, to_json, get_response_time
from flask_cors import CORS
from datetime import datetime, timedelta, date, time
import atexit

app = Flask(__name__)
app.config.from_pyfile("config.py")
jwt = JWTManager(app)
CORS(app)

from monitor import Monitor
from models import db, User, Service, Incident, UserRole, CheckMethod, DailyUptime, Check
from daily_uptime_scheduler import daily_uptime_scheduler

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
        return jsonify(to_json(deserialize(services)))
    
    verify_jwt_in_request()
    data = request.get_json()
    check_method = CheckMethod.get(data["checkMethod"].lower())
    service = None

    if check_method is None:
        return jsonify({ "msg": "no such check method"}), 400

    try:
        service = Service(
            name=data["name"],
            address=data["address"],
            check_method=check_method,
            check_interval=data["checkInterval"],
            monitoring_status=True
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
        return jsonify(to_json(deserialize(service)))
    
    verify_jwt_in_request()
    data = request.get_json()
    
    if request.method == "PUT":
        try:
            service_query_filter.update(from_json(data))
            db.session.commit()
            service_monitor.update(service_query_filter.first())
        except Exception as e:
            return jsonify({ "msg": "can not update service", "error": str(e) }), 500
        
        return jsonify({ "msg": "service updated" })
    
    if request.method == "DELETE":
        try:
            service_query_filter.delete()
            db.session.commit()
            service_monitor.remove(service_query_filter.first()['id'])
        except Exception as e:
            return jsonify({ "msg": "can not delete service", "error": str(e) }), 500
    
        return jsonify({ "msg": "service deleted" })

    return jsonify({ "msg": "bad request" }), 400


@app.route("/api/services/<id>/uptime", methods=["GET"]) # days parameter is necessary
def api_services_id_uptime(id):
    days = request.args.get("days")

    if days is None:
        return jsonify({ "msg": "no 'days' url parameter" })
    
    period = date.today() - timedelta(days=int(days))
    today_period = datetime.combine(date.today(), time.min)
    daily_uptime = None

    try:
        daily_uptime = db.session.query(DailyUptime)\
            .filter(DailyUptime.service_id == id)\
            .filter(DailyUptime.date > period).all()
        today_uptime = db.session.query(Check)\
            .filter(Check.service_id == id)\
            .filter(Check.datetime > today_period)
        daily_uptime.append(today_uptime)
    except:
        return jsonify({ "msg": "can not get uptime data"})
    
    response_data = [{"date": day.date, "value": day.value} for day in daily_uptime]

    return jsonify(response_data)


@app.route("/api/services/<id>/response-time", methods=["GET"]) # days parameter is necessary
def api_services_id_response_time(id):
    days = request.args.get("days")

    if days is None:
        return jsonify({ "msg": "no 'days' url parameter" })
    
    now = datetime.now()
    period = now - timedelta(days=int(days))
    check_query = db.session.query(Check)\
        .filter(Check.service_id == id)\
        .filter(Check.datetime >= period)
    response_time_data = None

    try:
        response_time_data = get_response_time(Check, check_query, now, period)
    except Exception as e:
        print(e)
        return jsonify({ "msg": "can not get response time"}), 500
    
    return jsonify(response_time_data)


@app.route("/api/services/<id>/change-status", methods=["POST"])
@jwt_required()
def api_services_id_change_status(id):
    service = db.session.query(Service).filter_by(id=id).first()
    
    if service.monitoring_status:
        service.monitoring_status = False
        db.session.commit()
        service_monitor.stop(id)
    else:
        service.monitoring_status = True
        db.session.commit()
        service_monitor.start(id)
    
    return jsonify({ "msg": "service monitoring status changed" })


@app.route("/api/incidents", methods=["GET"]) # service-id parameter is necessary
def api_incidents_service_id():
    service_id = request.args.get("service-id")

    if service_id is None:
        return jsonify({ "msg": "no 'service-id' url parameter" }), 400
    
    incidents = db.session.query(Incident).filter_by(service_id=service_id).all()
    return jsonify(to_json(deserialize(incidents)))


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
    deserialized_user = deserialize(user)
    del deserialized_user['password_hash']
    response = make_response(deserialized_user)
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)
    return response


@app.route("/api/logout", methods=["POST"])
def api_logout():
    response = jsonify({ "msg": "successfully logged out" })
    unset_jwt_cookies(response)
    return response


@app.route("/api/check-auth", methods=["GET"])
@jwt_required()
def api_check_auth():
    identity = get_jwt_identity()
    user = db.session.query(User).filter_by(login=identity).one_or_none()

    if user is None:
        return jsonify({ "msg": "no such user" }), 401
    
    deserialized_user = deserialize(user)
    del deserialized_user['password_hash']
    response = jsonify(deserialized_user)
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
        return jsonify({ "msg": "can not create user", "error": str(e) }), 500
    
    return jsonify({ "msg": "user created" })


@app.route("/api/refresh", methods=["POST"])
@jwt_required(refresh=True)
def api_refresh():
    try:
        identity = get_jwt_identity()
        access_token = create_access_token(identity)
        response = make_response({ "msg": "successfully refreshed" })
        unset_access_cookies(response)
        set_access_cookies(response, access_token)
        return response
    except:
        return jsonify({ "msg": "can not refresh token" }), 500


if __name__ == "__main__":
    with app.app_context():
        db.create_all() # create tables if some do not exist
        
        if not db.session.query(User).filter_by(login=app.config["AUTH_LOGIN"]).one_or_none():
            superadmin = User(
                name="Main Admin",
                login=app.config["AUTH_LOGIN"],
                password_hash=generate_password_hash(app.config["AUTH_PASSWORD"], salt_length=64),
                role=UserRole.SUPERADMIN
            )
            db.session.add(superadmin)
            db.session.commit()

    service_monitor.run()
    atexit.register(lambda: service_monitor.shutdown(wait=False))
    app.run(debug=True, use_reloader=False)
