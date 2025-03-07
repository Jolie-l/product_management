import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import { AuthRouter } from "@/components/AuthRouter";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Category from "@/pages/Category";
import User from "@/pages/User";
import AddProduct from "@/pages/Product/addProduct";
import ProductDetail from "@/pages/Product/ProductDetail";
import AddCategory from "@/pages/Category/addCategory"
import AddUser from "@/pages/User/addUser";
import EditCurrentUser from "@/pages/Layout/editCurrentUser";


//做路由配置
const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthRouter><Layout /></AuthRouter>,  // 登录验证, 只有登录用户才能访问
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path:"edit-current-user",
                element:<EditCurrentUser/>
            },
            {
                path: "products",
                element: <Product />,
            },
            {
                path: "add-product",
                element: <AddProduct />
            },
            {
                path: "product-detail/:productId",
                element: <ProductDetail />
            },
            {
                path: "categories",
                element: <Category />
            },
            {
                path: "add-category",
                element: <AddCategory />
            },
            {
                path: "users",
                element: <User />
            },
            {
                path: "add-user",
                element: <AddUser />
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;