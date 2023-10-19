import { createContext } from "react";
import axios from "@api/axios.jsx";

const AuthContext = createContext(null);

let isAuth = false;
let user = null; // name, login, role

async function login(credentials) {
    console.log("logging in user...");
    let response = await axios.post("/login", credentials, {
        withCredentials: true
    }).catch(error => {console.log(error); return error});
    
    if (response?.status !== 200) {
        console.log("something went wrong");
        return false;
    }
    
    console.log(response);

    isAuth = true;
    user = response.data;
    console.log("user logged in");
    return true;
}

function logout() {
    console.log("logging out user...");
    axios.post("/logout").catch(error => console.log(error));
    console.log("user logged out");
    user = null;
    isAuth = false;
}

function AuthProvider({ children }) {
    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };
