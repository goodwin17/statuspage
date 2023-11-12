from __main__ import app
from flask_apscheduler import APScheduler
from models import db, Service, Check, Incident, IncidentType, CheckMethod
from utils import check_service_http, check_service_icmp
from datetime import datetime
import json
from enum import Enum

class CheckStatus(Enum):
    OK = "ok"
    ERROR = "error"
    TIMEOUT = "timeout"


class Monitor:
    def __init__(self):
        self.scheduler = APScheduler(app=app)
        self.last_statuses = {}

    
    def run(self):
        for service in self.services():
            self.add(service)
            self.last_statuses[service.id] = None
        
        self.scheduler.start()


    def shutdown(self, wait=False):
        self.scheduler.shutdown(wait)


    def add(self, service):
        self.scheduler.add_job(
            id=str(service.id),
            func=self.check_service,
            args=[service.id],
            trigger="interval",
            seconds=service.check_interval
        )
        self.last_statuses[service.id] = None
    

    def start(self, service_id):
        self.scheduler.resume_job(str(service_id))


    def stop(self, service_id):
        self.scheduler.pause_job(str(service_id))


    def remove(self, service_id):
        self.scheduler.remove_job(str(service_id))
        del self.last_statuses[service_id]

    
    def update(self, service): # method, interval
        self.scheduler.remove_job(str(service.id))
        self.scheduler.add_job(
            id=str(service.id),
            func=self.check_service,
            args=[service.id],
            trigger="interval",
            seconds=service.check_interval
        )


    def service(self, id):
        with app.app_context():
            return db.session.query(Service).filter_by(id=id).first()


    def services(self):
        with app.app_context():
            return db.session.query(Service).all()


    def check_service(self, service_id):
        service = self.service(service_id)

        if service is None:
            return None
        
        result = None
        method_func = None
        current_time = datetime.now()

        if service.check_method == CheckMethod("http").name:
            method_func = check_service_http
        else:
            method_func = check_service_icmp
        
        result = method_func(service.address)
        check = Check(
            service_id=service.id,
            datetime=current_time,
            result=json.dumps(result)
        )

        with app.app_context():
            db.session.add(check)
            db.session.commit()
        
        last_status = self.last_statuses[service_id]

        if last_status is None or last_status != result["status"]:
            self.register_incident(service_id, last_status, result["status"], current_time)
        
        self.last_statuses[service_id] = result["status"]


    def register_incident(self, service_id, check_result, current_time):
        incident_title = None
        incident_type = None
        last_status = self.last_statuses[service_id]

        if last_status is None:
            incident_title = "Monitoring started"
            incident_type = IncidentType.START
        elif last_status == CheckStatus.OK:
            incident_title = "Down now"
            incident_type = IncidentType.DOWN
        else:
            incident_title = "Up now"
            incident_type = IncidentType.UP

        if incident_type is None:
            return None
        
        incident = Incident(
            service_id=service_id,
            type=incident_type,
            title=incident_title,
            datetime=current_time
        )
        
        with app.app_context():
            db.session.add(incident)
            db.session.commit()
