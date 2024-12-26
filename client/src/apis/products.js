import { request } from "@/utils"



//根据id获取商品详情
export function getProductById(id) {
    return request({
        url:`/products/${id}`,
        method: "GET"
    })
}