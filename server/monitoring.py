from utils import check_service_http, check_service_icmp, serialize
from datetime import datetime
import json
from __main__ import app
from models import db, Check


class Monitoring:
    def __init__(self, scheduler, services):
        self.scheduler = scheduler
        self.services = self.__correct_services(services)


    def setup(self):
        for service in self.services:
            self.add(service)
        
        self.scheduler.start()


    def add(self, service):
        if not self.__has_service(service['id']):
            self.scheduler.add_job(
                id=str(service['id']),
                func=self.__check_service,
                args=[service['id']],
                trigger='interval',
                seconds=service['check_interval']
            )


    def start(self, service_id):
        if self.__has_service(service_id):
            self.scheduler.resume_job(service_id)


    def stop(self, service_id):
        if self.__has_service(service_id):
            self.scheduler.pause_job(service_id)


    def __correct_services(self, services):
        new_services = []

        for service in services:
            new_service = service
            new_service['last_status'] = None
            new_services.append(new_service)
        
        return new_services


    def __has_service(self, id):
        return any(service['id'] == id for service in self.services)
    

    def __get_service(self, id):
        for service in self.services:
            if service['id'] == id:
                return service
            
        return None


    def __check_service(self, service_id):
        service = self.__get_service(service_id)

        if service is None:
            return None
        
        method = None
        result = None
        current_time = str(datetime.now())

        if service['check_method'] == 'http':
            method = check_service_http
        else:
            method = check_service_icmp
        
        result = method(service['address'])

        if result['status'] == 'error': # either 'ok' or 'error'
            return None
        
        with app.app_context():
            check = Check(
                service_id=service['id'],
                datetime=str(current_time),
                result=json.dumps(result)
            )
            db.session.add(check)
            db.session.commit()
            
            service['last_status'] = result['status']
