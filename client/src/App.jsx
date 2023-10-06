import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import router from "./router.jsx";

export default function App() {
    return (
        <div
            className="app"
            style={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <RouterProvider router={router} />
        </div>
    );
}
