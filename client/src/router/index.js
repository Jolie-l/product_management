import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { AuthRouter } from "@/components/AuthRouter";


//做路由配置
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRouter><Layout /></AuthRouter>,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default router;