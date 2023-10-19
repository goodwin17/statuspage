import axios from "@api/axios.jsx";

async function getService(serviceId) {
    console.log("getService start");
    let response = await axios.get(`/services/${serviceId}`).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log("getService went wrong");
        return null;
    }
    
    console.log("getService ok");
    return response.data;
}

async function getIncidents(serviceId) {
    console.log("getIncidents start");
    let response = await axios.get(`/incidents?service-id=${serviceId}`).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log("getIncidents went wrong");
        return null;
    }
    
    console.log("getIncidents ok");
    return response.data;
}

async function getUptime(serviceId) {
    console.log("getUptimeData start");
    let response = await axios.get(`/service/${serviceId}/uptime?days=60`).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log("getUptimeData went wrong");
        return null;
    }
    
    console.log("getUptimeData ok");
    return response.data;
}

async function getResponseTime(serviceId) {
    console.log("getResponseTimeData start");
    let response = await axios.get(`/service/${serviceId}/response-time?days=60`).catch(error => console.log(error));

    if (response?.status !== 200) {
        console.log("getResponseTimeData went wrong");
        return null;
    }
    
    console.log("getResponseTimeData ok");
    return response.data;
}

async function createService(service) {
    let { name, address, checkMethod, checkInterval } = service;
    console.log("createService start");
    let response = await axios.post("/services", {
        "name": name,
        "address": address,
        "check-method": checkMethod,
        "check-interval": checkInterval
    }).catch(error => console.log(error));

    if (response.status !== 200) {
        console.log("createService went wrong");
        return false;
    }
    
    console.log("createService ok");
    return true;
}

async function createUser(user) {
    let { name, login, password, role } = user;
    console.log("createUser start");
    let response = await axios.post("/register", {
        "name": name,
        "login": login,
        "password": password,
        "role": role
    }).catch(error => console.log(error));
    
    if (response?.status !== 200) {
        console.log("createUser went wrong");
        return false;
    }
    
    console.log("createUser ok");
    return true;
}

export {
    createUser,
    createService,
    getService,
    getIncidents,
    getUptime,
    getResponseTime
};
