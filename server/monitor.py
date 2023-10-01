from __main__ import app
from flask_apscheduler import APScheduler
from models import db, Service, Check
from utils import check_service_http, check_service_icmp
from datetime import datetime
import json

class Monitor:
    def __init__(self):
        self.scheduler = APScheduler(app=app)

    
    def run(self):
        for service in self.services():
            self.add(service)
        
        self.scheduler.start()


    def add(self, service):
        self.scheduler.add_job(
            id=str(service.id),
            func=self.check_service,
            args=[service.id],
            trigger='interval',
            seconds=service.check_interval
        )
    

    def start(self, service_id):
        self.scheduler.resume_job(str(service_id))


    def stop(self, service_id):
        self.scheduler.pause_job(str(service_id))


    def remove(self, service_id):
        self.scheduler.remove_job(str(service_id))

    
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
        print('check start')

        if service is None:
            print('no service')
            return None
        
        method = None
        result = None
        current_time = str(datetime.now())

        if service.check_method == 'http':
            method = check_service_http
        else:
            method = check_service_icmp
        
        print('check preparing...')
        result = method(service.address)
        print('check processing...')
        print(result)

        if result['status'] == 'error': # either 'ok' or 'error'
            return None
        
        check = Check(
            service_id=service.id,
            datetime=str(current_time),
            result=json.dumps(result)
        )
        print('check added...')
        with app.app_context():
            db.session.add(check)
            db.session.commit()
