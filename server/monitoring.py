from jobs import check_service


class Monitoring:
    def __init__(self, scheduler, services):
        self.scheduler = scheduler
        self.services = services


    def setup(self):
        for service in self.services:
            self.add(service)
        
        self.scheduler.start()


    def add(self, service):
        if not self.__has_service(service['id']):
            self.scheduler.add_job(
                id=str(service['id']),
                func=check_service,
                args=[service],
                trigger='interval',
                seconds=service['check_interval']
            )


    def start(self, service_id):
        if self.__has_service(service_id):
            self.scheduler.resume_job(service_id)


    def stop(self, service_id):
        if self.__has_service(service_id):
            self.scheduler.pause_job(service_id)


    def __has_service(self, id):
        return any(service['id'] == id for service in self.services)
