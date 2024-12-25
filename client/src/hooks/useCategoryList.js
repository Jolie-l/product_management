//封装获取分类列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";

function useCategoryList() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getCategoryList = async () => {
            const res = await request.get('/categories')
            console.log("获取分类列表");

            console.log(res);

            setCategoryList(res)
        }

        //调用函数
        getCategoryList()
    }, [])

    return {categoryList}
}

export { useCategoryList }