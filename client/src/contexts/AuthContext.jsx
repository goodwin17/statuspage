import { createContext, useState } from "react";
import axios from "@api/axios.jsx";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    let [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem('isAuth')) ?? false);
    let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    async function login(credentials) {
        console.log("logging in...");
        let response = await axios.post("/login", credentials, {
            withCredentials: true
        }).catch(error => {console.log(error); return error});
        
        if (response?.status !== 200) {
            console.log("something went wrong");
            return false;
        }

        localStorage.setItem('isAuth', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(response.data));
        setIsAuth(true);
        setUser(response.data);
        console.log("user logged in");
        return true;
    }
    
    function logout() {
        console.log("logging out...");
        axios.post("/logout").catch(error => console.log(error));
        localStorage.removeItem('isAuth');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuth(false);
        console.log("user logged out");
    }
    
    return (
        <AuthContext.Provider value={{ isAuth, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthProvider };
