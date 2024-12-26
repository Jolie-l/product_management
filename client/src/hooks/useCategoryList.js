//封装获取分类列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";
import dayjs from 'dayjs'

function useCategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getCategoryList = async () => {
            const res = await request.get('/categories')
            setCategoryList(res)
        }

        //调用函数
        getCategoryList()
    }, [])

        // 如果 productList 为空，返回空数组
        if (categoryList.length === 0) {
            return [];
        }
    
        //数据处理
        const formatCategoryList = categoryList.map(item => ({
            id: item.id,   
            name: item.name,
            description: item.description,
            createUserId: item.createUserId,
            updateUserId: item.updateUserId,
            formatCreatedAt: dayjs(item.createdAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
            formatUpdatedAt: dayjs(item.updatedAt).format('YYYY-MM-DD'), // 使用 dayjs 格式化日期
        }))
    
        // 返回处理后的数据
        return formatCategoryList
}

export { useCategoryList }