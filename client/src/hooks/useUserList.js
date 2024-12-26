//封装获取用户列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import dayjs from 'dayjs'

function useUserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getUserList = async () => {
            const res = await request.get('/users')

            setUserList(res)
        }

        //调用函数
        getUserList()
    }, [])
    // 如果 productList 为空，返回空数组
    if (userList.length === 0) {
        return [];
    }

    //数据处理
    const formatUserList = userList.map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        formatCreatedAt: dayjs(item.createdAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
        formatUpdatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
    }))

    // 返回处理后的数据
    return formatUserList 
}

export { useUserList }