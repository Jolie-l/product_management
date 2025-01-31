//封装获取产品列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import { message } from "antd";

function useProductList() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false); // 添加加载状态
    const [error, setError] = useState(null); // 添加错误状态

    const fetchProducts = async (inputcategoryId = '', inputcreateUserId = '', inputname = '') => {
        setLoading(true); // 开始加载
        setError(null); // 清空之前的错误
        try {
            const resp = await request.get('/products')
            let products = resp //使用let声明，方便后面可以重新赋值

            //如果有分类id，则过滤
            if (inputcategoryId) {
                products = products.filter((Item) => {
                    // 如果categoryId未定义，跳过该产品
                    if (Item.categoryId === undefined) {
                        return false;
                    }
                    return Item.categoryId === inputcategoryId;
                })
            }

            //如果有创建者id，则过滤
            if (inputcreateUserId) {
                products = products.filter((Item) => {
                    // 如果categoryId未定义，跳过该产品
                    if (Item.createUserId === undefined) {
                        return false;
                    }
                    return Item.createUserId === inputcreateUserId;
                })
            }

            //如果有包含名称关键字的，则过滤
            if (inputname) {
                products = products.filter((Item) => {
                    return Item.name.toLowerCase().includes(inputname.toLowerCase())
                }
                )
            }

            //对获取到的数据进行排序
            const sortedProducts = products.sort((a, b) => {
                const timeA = new Date(a.createdAt).getTime();
                const timeB = new Date(b.createdAt).getTime();
                return timeB - timeA;

            })
            setProductList(sortedProducts)



        } catch (error) {
            console.log(error)
            setError(error);
            message.error("获取商品列表失败")
        } finally {
            setLoading(false); // 结束加载
        }


    }

    //读取初始数据
    useEffect(() => {
        fetchProducts(); // 可以在插入后去获取最初的产品列表
    }, []); // 依赖数组为空，表示只在挂载时调用一次

    return { productList, fetchProducts }; 
}

export { useProductList }