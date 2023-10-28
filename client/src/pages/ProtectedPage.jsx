import useAuth from "@hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Protected() {
    let { isAuth, user } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuth || !user) {
            navigate("/");
        }
    });

    return (
        <Outlet />
    );
}
