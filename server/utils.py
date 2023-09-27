import requests
import platform
import subprocess
from time import time
import threading


def check_service_http(address):
    if not address.startswith('http'):
        address = f'https://{address}'

    try:
        response = requests.get(address)
        result = {
            'status': response.status_code,
            'response_time': response.elapsed
        }
    except:
        result = {
            'status': 'error'
        }
    
    return result


def check_service_icmp(address):
    if address.startswith('http'):
        address = address.split('//')[1]
    
    sys_name = platform.system().lower()
    param = '-n' if sys_name == 'windows' else '-c'
    command = ['ping', param, '1', address]

    try:
        response = subprocess.check_output(command).decode('cp866')
        result = {
            'status': 'ok',
            'response_time': response.split('Среднее = ')[1].split(' мсек')[0]
        }
    except:
        result = {
            'status': 'error'
        }
    
    return result


def serialize(obj):
    return {c.name: getattr(obj, c.name) for c in obj.__table__.columns}


def set_service_monitoring(url, interval):
    while True:
        check_thread = threading.Thread(target=check_service_http, args=(url,))
        print(f'check started at {url}')
        check_thread.daemon = True
        check_thread.start()
        time.sleep(interval)


def monitor(websites):
    threads = []
    
    for website in websites:
        url = website["url"]
        interval = website["interval"]
        print(f"Monitoring {url} every {interval} seconds.")
        thread = threading.Thread(target=set_service_monitoring, args=(url, interval))
        thread.daemon = True
        thread.start()
        threads.append(thread)
    
    for thread in threads:
        thread.join()
