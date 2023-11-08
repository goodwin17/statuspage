import AuthContext from "@contexts/AuthContext";
import { useContext } from "react";

export default function useAuth() {
    let { checkAuth, ...auth } = useContext(AuthContext);
    let [isAuth, user] = checkAuth();
    
    return {
        isAuth,
        user,
        ...auth
    };
}
