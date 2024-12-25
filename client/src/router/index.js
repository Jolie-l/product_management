import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { AuthRouter } from "@/components/AuthRouter";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Category from "@/pages/Category";
import User from "@/pages/User";


//做路由配置
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRouter><Layout /></AuthRouter>,  // 登录验证, 只有登录用户才能访问
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "products",
                element: <Product/>
            },
            {
                path: "categories",
                element: <Category/>
            },
            {
                path: "users",
                element: <User/>
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;