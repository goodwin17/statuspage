from utils import check_service_http, check_service_icmp
from datetime import datetime
import json


def check_service(service):
    method = None
    result = None
    current_time = str(datetime.now())

    if service['check_method'] == 'http':
        method = check_service_http
    else:
        method = check_service_icmp
    
    result = method(service['address'])

    if result['status'] == 'error':
        return None
    
    from __main__ import app
    from models import db, Check
    
    with app.app_context():
        check = Check(
            service_id=service['id'],
            datetime=str(current_time),
            result=json.dumps(result)
        )
        db.session.add(check)
        db.session.commit()
