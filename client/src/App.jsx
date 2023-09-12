import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import IndexPage from "./pages/IndexPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [{
            index: true,
            element: <IndexPage />
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
