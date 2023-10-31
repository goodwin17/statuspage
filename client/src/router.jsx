import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/Layout";
import IndexPage from "@pages/IndexPage";
import ServicePage, { loader as servicePageLoader} from "@pages/ServicePage";
import AdminPage from "@pages/AdminPage";
import AdminAccountPage from "@pages/AdminAccountPage";
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
        path: "admin",
        element: <AdminPage />
    }, {
        path: "admin/account",
        element: <AdminAccountPage />
    }, {
        path: "test",
        element: <TestPage />
    }, {
        path: "/*",
        element: <ErrorPage />
    }]
}]);

export default router;
