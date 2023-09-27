from utils import check_service_http, check_service_icmp
from models import Check
from app import db
from datetime import datetime


def check_service(service):
    method = None
    current_time = datetime.now()

    if service['check_method'] == 'http':
        method = check_service_http
    else:
        method = check_service_icmp
    
    result = method(service['address'])
    check = Check(
        service_id=service['id'],
        datetime=current_time,
        response=result
    )
    db.session.add(check)
    db.session.commit()
