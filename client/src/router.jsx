import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout";
import IndexPage from "@pages/IndexPage";
import ServicePage, { loader as servicePageLoader} from "@pages/ServicePage";
import AdminPage from "@pages/AdminPage";
import AdminAccountPage from "@pages/AdminAccountPage";
import TestPage from "@pages/TestPage";
import ProtectedPage from "@pages/ProtectedPage";
import UsersPage from "@pages/UsersPage";
import ErrorPage from "@pages/ErrorPage";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        index: true,
        element: <IndexPage />
    }, {
        path: "/services/:serviceId",
        element: <ServicePage />,
        loader: servicePageLoader
    }, {
        path: "/admin",
        element: <ProtectedPage />,
        children: [{
            index: true,
            element: <AdminPage />
        }, {
            path: "/admin/account",
            element: <AdminAccountPage />
        // }, {
        //     path: "/admin/users",
        //     element: <UsersPage />
        }, {
            path: "/admin/*",
            element: <ErrorPage />
        }]
    }, {
        path: "/test",
        element: <TestPage />
    }, {
        path: "/*",
        element: <ErrorPage />
    }]
}]);

export default router;
