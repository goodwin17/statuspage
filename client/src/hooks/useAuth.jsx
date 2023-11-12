import AuthContext from "@contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function useAuth() {
    let { checkAuth, ...auth } = useContext(AuthContext);
    const [isAuth, setIsAuth] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getAuth() {
            let [isAuth, user] = await checkAuth();
            setIsAuth(isAuth);
            setUser(user);
        }

        getAuth();
    }, []);
    
    return {
        isAuth,
        user,
        ...auth
    };
}
