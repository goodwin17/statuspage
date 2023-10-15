import axios from "@api/axios.jsx";

async function getService(serviceId) {
    console.log("getService start");
    let response = await axios.get(`/services/${serviceId}`).catch(error => console.log(error));
    console.log("getService end");

    if (response) {
        return response.data;
    }

    return null;
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

    if (!response) {
        console.log("createService went wrong");
        return false;
    }
    
    console.log("createService ok");
    return true;
}

async function registerUser(credentials) {
    console.log("registering user...");
    let response = await axios.post("/register", credentials).catch(error => console.log(error));
    
    if (response) {
        console.log("user registered");
        return true;
    }

    console.log("something went wrong");
    return false;
}

export {
    getService,
    registerUser,
    createService
};
