//封装获取用户列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";

function useUserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getUserList = async () => {
            const res = await request.get('/users')
            console.log("获取用户列表");
            
            console.log(res);

            setUserList(res)
        }

        //调用函数
        getUserList()
    }, [])

    return { userList } 
}

export { useUserList }