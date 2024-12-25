//axios的封装，统一处理请求
import axios from 'axios'
import { getToken } from './token'
import router from '@/router'

const request = axios.create({
    //1.根域名配置
    baseURL: 'http://localhost:8000',

    //2.超时时间
    timeout: 5000
})

// 3.添加请求拦截器,在发送请求之前做一些处理
request.interceptors.request.use((config) => {

    //在发送请求之前封装token
    const token = getToken()
    if (token) {
        //在请求头中添加token
        config.headers.Authorization = `Bearer ${token}`
    }
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
    //监控401错误，如果是401错误，则清除token，并跳转到登录页面
    if (error.response.status === 401) {
        //清除token
        localStorage.removeItem('token_key')
        localStorage.removeItem('id')
        //跳转到登录页面
        router.navigate('/login')
        //刷新页面
        window.location.reload()
    }
    return Promise.reject(error)
})

export { request }


//5.请求方法封装