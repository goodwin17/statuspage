import requests
import platform
import subprocess


def check_service_http(address):
    if not address.startswith('http'):
        address = f'https://{address}'

    response = None
    result = None

    try:
        response = requests.get(address)
    except:
        result = { 'status': 'error' }
        return result
    
    if response.status_code >= 400:
        result = { 'status': 'error' }
        return result
    
    result = {
        'status': 'ok',
        'response_time': str(response.elapsed)
    }
    return result


def check_service_icmp(address):
    if address.startswith('http'):
        address = address.split('//')[1]
    
    sys_name = platform.system().lower()
    param = '-n' if sys_name == 'windows' else '-c'
    command = ['ping', param, '1', address]
    response = None
    result = None

    try:
        response = subprocess.check_output(command).decode('cp866')
    except:
        result = { 'status': 'error' }

    result = {
        'status': 'ok',
        'response_time': response.split('Среднее = ')[1].split(' мсек')[0]
    }
    return result


def serialize(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}


def serialize_all(objs):
    return [serialize(obj) for obj in objs]
