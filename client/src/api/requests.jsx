import axios from "@api/axios.jsx";

async function sendData(funcName, type, path, data) {
    console.log(`${funcName} start`);
    let response = null;

    if (type === 'get') {
        response = await axios.get(path).catch(error => console.log(error));
    } else if (type === 'post') {
        response = await axios.post(path, data).catch(error => console.log(error));
    } else {
        console.log(`${funcName} wrong type`);
        return null;
    }

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

const createService = async (service) => await postData('createService', '/services', service);

const createUser = async (user) => await postData('createUser', '/register', user);

const getService = async (serviceId) => await getData('getService', `/services/${serviceId}`);

const getServices = async () => await getData('getServices', '/services');

const getIncidents = async (serviceId) => await getData('getIncidents', `/incidents?service-id=${serviceId}`);

const getUptime = async (serviceId) => await getData('getUptime', `/services/${serviceId}/uptime?days=60`);

const getResponseTime = async (serviceId) => await getData('getResponseTime', `/services/${serviceId}/response-time?days=60`);

export {
    createUser,
    createService,
    getService,
    getServices,
    getIncidents,
    getUptime,
    getResponseTime
};
