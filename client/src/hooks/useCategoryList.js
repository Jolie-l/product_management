//封装获取用户列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import { message } from "antd";
function useCategoryList() {

    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false); // 添加加载状态
    const [error, setError] = useState(null); // 添加错误状态

    const fetchCategory = async (inputcreateUserId = '', inputname = '',page=1,pageSize=8) => {
        setLoading(true); // 开始加载
        setError(null); // 清空之前的错误
        try {
            const res = await request.get('/categories')
            let categories = res

            //如果有包含名称关键字的，则过滤
            if (inputname) {
                console.log(inputname);
                categories = categories.filter((Item) => {
                    return Item.name.toLowerCase().includes(inputname.toLowerCase())
                }
                )
            }
            //排序
            const sortedCategories = categories.sort((a, b) => {
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                return timeB - timeA;
            })

            setCategoryList(sortedCategories); // 设置分类列表


        } catch (error) {
            console.log(error);
            setError(error); // 记录错误
            message.error("获取用户列表失败"); // 显示错误提示

        } finally {
            setLoading(false); // 加载结束
        }

    }

    // 设定一个副作用来读取初始数据
    useEffect(() => {
        fetchCategory();
        // 依赖数组为空，表示只在挂载时调用一次
    }, [])

    return { categoryList, fetchCategory }
}

export { useCategoryList }