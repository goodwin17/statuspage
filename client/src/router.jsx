import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout";
import IndexPage from "@pages/IndexPage";
import ServicePage, { loader as servicePageLoader} from "@pages/ServicePage";
import LoginPage from "@pages/LoginPage";
import AdminPage from "@pages/IndexPage";
import TestPage from "@pages/TestPage";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [{
        index: true,
        element: <IndexPage />
    }, {
        path: "services/:serviceId",
        element: <ServicePage />,
        loader: servicePageLoader
    }, {
        path: "login",
        element: <LoginPage />
    }, {
        path: "admin",
        element: <AdminPage />
    }, {
        path: "test",
        element: <TestPage />
    }]
}]);

export default router;
