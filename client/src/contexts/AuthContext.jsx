import { createContext } from "react";
import axios from "@api/axios.jsx";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    async function login(credentials) {
        console.log("logging in...");
        let response = await axios.post("/login", credentials, {
            withCredentials: true
        }).catch(error => {console.log(error); return error});
        
        if (response?.status !== 200) {
            console.log("something went wrong");
            return false;
        }
        console.log("user logged in");
        setTimeout(() => window.location.reload(), 100);
        return true;
    }
    
    function logout() {
        console.log("logging out...");
        axios.post("/logout").catch(error => console.log(error));
        console.log("user logged out");
        setTimeout(() => window.location.reload(), 100);
    }

    async function checkAuth() {
        console.log("checking auth...");
        let response = await axios.post("/check-auth").catch(error => console.log(error));
        
        if (response?.status !== 200) {
            console.log("something went wrong");
            return [false, null];
        }

        console.log("auth ok");
        return [true, response.data];
    }
    
    return (
        <AuthContext.Provider value={{ checkAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };
