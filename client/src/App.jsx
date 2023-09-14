import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@components/Layout";
import IndexPage from "@pages/IndexPage";
import ServicePage from "@pages/ServicePage";
import LoginPage from "@pages/LoginPage";
import AdminPage from "@pages/IndexPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [{
            index: true,
            element: <IndexPage />
        }, {
            path: "service",
            element: <ServicePage />
        }, {
            path: "login",
            element: <LoginPage />
        }, {
            path: "admin",
            element: <AdminPage />
        }]
    },
]);

export default function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    );
}
