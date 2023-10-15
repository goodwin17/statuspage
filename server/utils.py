import requests
import icmplib
from enum import Enum


def check_service_http(address):
    if not address.startswith("http"):
        address = f"https://{address}"

    response = None
    result = {
        "status": None,
        "code": None,
        "response_time": None
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
    result["response_time"] = str(response.elapsed)
    return result


def check_service_icmp(address):
    if address.startswith("http"):
        address = address.split("//")[1]

    response = None
    result = {
        "status": None,
        "response_time": None
    }

    try:
        response = icmplib.ping(address, 4)
    except:
        result["status"] = "error"
        return result

    result["status"] = "ok"
    result["response_time"] = response.avg_rtt
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


def convert_dict_notation(data): # convert json notation to python
    return { key.replace("-", "_"): data[key] for key in data}
