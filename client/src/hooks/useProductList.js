//封装获取产品列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import dayjs from 'dayjs';

function useProductList() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getProductList = async () => {
            const res = await request.get('/products')

            setProductList(res)
        }

        //调用函数
        getProductList()

    }, [])

    // 如果 productList 为空，返回空数组
    if (productList.length === 0) {
        return [];
    }

    //数据处理
    const formatProductList = productList.map(item => ({
        id: item.id,
        image: item.image,
        name: item.name,
        price: item.price,
        description: item.description,
        categoryId: item.categoryId,
        number: item.number,
        createUserId: item.createUserId,
        updateUserId: item.updateUserId,
        formatCreatedAt: dayjs(item.createdAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
        formatUpdatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
    }))

    // 返回处理后的数据
    return formatProductList
}

export { useProductList }