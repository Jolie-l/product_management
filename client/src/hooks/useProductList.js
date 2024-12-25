//封装获取产品列表的hook
import { useState, useEffect } from "react";
import { request } from "@/utils";

function useProductList() {
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        //封装函数，在函数体内部调用接口
        const getProductList = async () => {
            const res = await request.get('/products')
            console.log("获取产品列表");
            
            console.log(res);

            setProductList(res)
        }

        //调用函数
        getProductList()
    }, [])

    return productList 
}

export { useProductList }