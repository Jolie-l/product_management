//封装高阶组件
// 用于判断是否有token，如果有token，则渲染对应页面，否则跳转到登录页面
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";
export function AuthRouter({ children }) {
    const token = getToken();
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to="/login" replace />
    }
}