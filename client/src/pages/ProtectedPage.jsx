import useAuth from "@hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedPage() {
    let { isAuth, user } = useAuth();
    let location = useLocation();

        if (!isAuth || !user) {
            return <Navigate to="/" state= {{from: location.pathname}} />;
        }

    return <Outlet />;
}
