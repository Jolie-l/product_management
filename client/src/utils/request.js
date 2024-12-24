//axios的封装，统一处理请求
import axios from 'axios'

const request = axios.create({
    //1.根域名配置
    baseURL: 'http://localhost:8000',

    //2.超时时间
    timeout: 5000
})

// 3.添加请求拦截器,在发送请求之前做一些处理
request.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

// 4.添加响应拦截器,在接收到响应数据之后做一些处理
request.interceptors.response.use((response) => {
    //对正确响应的数据做处理
    return response.data
}, (error) => {
    //对错误响应的数据做处理
    return Promise.reject(error)
})

export { request }


//5.请求方法封装