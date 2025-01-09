//封装获取用户列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import { message } from "antd";
function useUserList() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(false); // 添加加载状态
    const [error, setError] = useState(null); // 添加错误状态
    const fetchUsers = async (inputcreateUserId = '', inputname = '') => {
        setLoading(true); // 开始加载
        setError(null); // 清空之前的错误
        try {
            const res = await request.get('/users')
            let users = res
            
            //如果有包含名称关键字的，则过滤
            if (inputname) {
                console.log(inputname);
                users = users.filter((Item) => {
                    return Item.name.toLowerCase().includes(inputname.toLowerCase())
                }
                )
            }

            //排序
            const sortedUser = users.sort((a, b) => {
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                return timeB - timeA;
            })
            setUserList(sortedUser); // 设置用户列表

        } catch (error) {
            console.log(error);
            setError(error); // 记录错误
            message.error("获取用户列表失败"); // 显示错误提示

        } finally {
            setLoading(false); // 加载结束
        }
    }

    // 读取初始数据
    useEffect(() => {
        fetchUsers();
    }, [])// 依赖数组为空，表示只在挂载时调用一次

    return { userList, fetchUsers }
}

export { useUserList }