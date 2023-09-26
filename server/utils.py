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
    sys_name = platform.system().lower()
    param = '-n' if sys_name == 'windows' else '-c'
    command = ['ping', param, '1', host]
    result = {}

    try:
        response = subprocess.check_output(command).decode('cp866')
        result['elapsed'] = response.split('Среднее = ')[1].split(' мсек')[0]
        result['status'] = 'ok'
    except:
        result['status'] = 'error'
    
    return result

def serialize(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}
