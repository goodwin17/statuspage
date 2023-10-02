from __main__ import app
from flask_apscheduler import APScheduler
from models import db, Service, Check, Incident
from utils import check_service_http, check_service_icmp
from datetime import datetime
import json

class Monitor:
    def __init__(self):
        self.scheduler = APScheduler(app=app)
        self.last_statuses = {}

    
    def run(self):
        for service in self.services():
            self.add(service)
            self.last_statuses[service.id] = None
        
        self.scheduler.start()


    def add(self, service):
        self.scheduler.add_job(
            id=str(service.id),
            func=self.check_service,
            args=[service.id],
            trigger='interval',
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
        self.remove(service.id)
        self.add(service)


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
        current_time = str(datetime.now())

        if service.check_method == 'http':
            method_func = check_service_http
        else:
            method_func = check_service_icmp
        
        result = method_func(service.address)

        if result['status'] == 'error': # either 'ok' or 'error'
            return None
        
        check = Check(
            service_id=service.id,
            datetime=str(current_time),
            result=json.dumps(result)
        )

        with app.app_context():
            db.session.add(check)
            db.session.commit()
        
        last_status = self.last_statuses[service_id]

        if last_status is None or last_status != result['status']:
            self.register_incident(service_id, last_status, result['status'], current_time)


    def register_incident(self, service_id, last_check_status, current_check_status, current_time):
        title = None

        if last_check_status is None:
            title = "Monitoring started"
        else:
            title = "Down right now"
        
        incident = Incident(
            service_id=service_id,
            title=title,
            datetime=str(current_time)
        )
        
        with app.app_context():
            db.session.add(incident)
            db.session.commit()
        
        self.last_statuses[service_id] = current_check_status
