import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";


//做路由配置
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default router;