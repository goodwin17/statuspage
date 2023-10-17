import requests
import icmplib
from enum import Enum
import re


def check_service_http(address):
    if not address.startswith("http"):
        address = f"https://{address}"

    response = None
    result = {
        "status": None,
        "code": None,
        "responseTime": None
    }

    try:
        response = requests.get(address)
    except:
        result["status"] = "error"
        return result
    
    if response.status_code >= 400:
        result["status"] = "error"
        result["code"] = response.status_code
        return result
    
    result["status"] = "ok"
    result["code"] = response.status_code
    result["responseTime"] = str(response.elapsed)
    return result


def check_service_icmp(address):
    if address.startswith("http"):
        address = address.split("//")[1]

    response = None
    result = {
        "status": None,
        "responseTime": None
    }

    try:
        response = icmplib.ping(address, 4)
    except:
        result["status"] = "error"
        return result

    result["status"] = "ok"
    result["responseTime"] = response.avg_rtt
    return result


def serialize(obj):
    result = {}

    for col in obj.__table__.columns:
        col_name = col.name
        col_value = getattr(obj, col.name)
        
        if isinstance(col_value, Enum):
            print(col_value.value)
            col_value = col_value.value
        
        result[col_name] = col_value
    
    return result


def serialize_all(objs):
    return [serialize(obj) for obj in objs]


def from_json(data): # convert json notation to python
    if isinstance(data, list):
        return [from_json(item) for item in data]
    
    if isinstance(data, dict):
        return { camel2snake(key): from_json(data[key]) for key in data}
    
    return data


def to_json(data): # convert python notation to json
    if isinstance(data, list):
        return [to_json(item) for item in data]

    if isinstance(data, dict):
        return { snake2camel(key): to_json(data[key]) for key in data}

    return data


def camel2snake(value): # convert notation from camelCase to snake_case
    return re.sub(r'([a-z0-9])([A-Z])', r'\1_\2', value).lower()


def snake2camel(value): # convert notation from snake_case to camelCase
    return re.sub(r'_([a-z])', lambda x: x.group(1).upper(), value)
