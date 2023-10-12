import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000/api';
axios.defaults.headers.common['Content-Type'] = 'application/json';

async function getService(serviceId) {
    console.log("getService start");
    let response = await axios.get(`/services/${serviceId}`).catch(error => console.log(error));
    console.log("getService end");

    if (response) {
        return response.data;
    }

    return null;
}

async function loginUser(credentials) {
    console.log("logging in user...");
    let response = await axios.post("/login", credentials).catch(error => console.log(error));
    
    if (response) {
        console.log("user logged in");
        return true;
    }

    console.log("something went wrong");
    return false;
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
    loginUser,
    registerUser
};
