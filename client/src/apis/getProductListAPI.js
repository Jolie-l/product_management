import { request } from "@/utils"
const getProductListAPI = () => {
    return request.get('/products')
}