import axios from "@api/axios.jsx";
import { hasProp } from "@helpers/utils";

async function sendData(type, path, data, funcName) {
    if (!funcName) {
        funcName = `sendData (${type}, ${path})`;
    }

    console.log(`${funcName} start`);
    let response = null;

    let requests = {
        'get': axios.get,
        'post': axios.post,
        'put': axios.put
    };

    if (!hasProp(requests, type)) {
        console.log(`${funcName} wrong type`);
        return null;
    }

    response = await requests[type](path, data).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log(`${funcName} error`);
        return null;
    }
    
    console.log(`${funcName} ok`);
    return response.data;
}

async function getData(funcName, path) {
    return await sendData(funcName, 'get', path);
}

async function postData(funcName, path, data) {
    return await sendData(funcName, 'post', path, data);
}

async function putData(funcName, path, data) {
    return await sendData(funcName, 'put', path, data);
}

const createService = async (service) => await postData('/services', service);

const createUser = async (user) => await postData('/register', user);

const editUser = async (userLogin, data) => await putData(`/users/${userLogin}`, data);

const getAdmins = async () => await getData('/users?role=admin');

const getIncidents = async (serviceId) => await getData(`/incidents?service-id=${serviceId}`);

const getResponseTime = async (serviceId) => await getData(`/services/${serviceId}/response-time?days=60`);

const getService = async (serviceId) => await getData(`/services/${serviceId}`);

const getServices = async () => await getData('/services');

const getUptime = async (serviceId) => await getData(`/services/${serviceId}/uptime?days=60`);

export {
    createUser,
    createService,
    editUser,
    getAdmins,
    getService,
    getServices,
    getIncidents,
    getUptime,
    getResponseTime
};
