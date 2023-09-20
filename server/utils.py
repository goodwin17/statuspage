import requests
import platform
import subprocess
from time import time

def check_service_http(url):
    response = requests.get(url)
    result = {
        'status_code': response.status_code,
        'response_time': response.elapsed
    }
    
    return result

def check_service_icmp(host):
    param = '-n' if platform.system().lower()=='windows' else '-c'
    command = ['ping', param, '1', host]
    result = {}

    try:
        start_time = time()
        subprocess.call(command, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
        end_time = time()
        result['response_time'] = (end_time - start_time) * 1000
        result['status'] = 'ok'
    except:
        result['status'] = 'no response'
    
    return result

def serialize(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}
