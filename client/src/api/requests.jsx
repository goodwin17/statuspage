import axios from "@api/axios";
import { hasProp } from "@helpers/utils";

let requests = {
    'get': axios.get,
    'post': axios.post,
    'put': axios.put
};

async function sendApiRequest(method, path, data, funcName) {
    if (!funcName) {
        funcName = `sendApiRequest (${method}, ${path})`;
    }

    console.log(`${funcName} start`);

    if (!hasProp(requests, method)) {
        console.log(`${funcName} invalid method`);
        return null;
    }

    let response = await requests[method](path, data).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log(`${funcName} error`);
        return null;
    }
    
    console.log(`${funcName} ok`);
    return response.data;
}

async function getData(path, funcName) {
    return await sendApiRequest('get', path, null, funcName);
}

async function postData(path, data, funcName) {
    return await sendApiRequest('post', path, data, funcName);
}

async function putData(path, data, funcName) {
    return await sendApiRequest('put', path, data, funcName);
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
