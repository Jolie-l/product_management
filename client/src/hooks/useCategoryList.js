//封装获取用户列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import { message } from "antd";
function useCategoryList() {
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false); // 添加加载状态
    const [error, setError] = useState(null); // 添加错误状态
    const fetchCategory = async (inputcreateUserId = '', inputname = '') => {
        setLoading(true); // 开始加载
        setError(null); // 清空之前的错误
        try {
            const res = await request.get('/categories')
            let categories = res

            //如果有创建者id，则过滤
            if (inputcreateUserId) {
                categories = categories.filter((Item) => {
                    // 如果categoryId未定义，跳过该产品
                    if (Item.createUserId === undefined) {
                        return false;
                    }
                    return Item.createUserId === inputcreateUserId;
                })
            }

            //如果有包含名称关键字的，则过滤
            if (inputname) {
                console.log(inputname);
                categories = categories.filter((Item) => {
                    return Item.name.toLowerCase().includes(inputname.toLowerCase())
                }
                )
            }

            setCategoryList(categories); // 设置用户列表
            console.log("过滤后的categorieslist");
            console.log(categories);


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
    }, [])// 依赖数组为空，表示只在挂载时调用一次

    return { categoryList, fetchCategory }
}

export { useCategoryList }