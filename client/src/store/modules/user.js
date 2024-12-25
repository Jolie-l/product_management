//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "user",

    //数据初始化状态
    initialState: {
        token: getToken() || '',
        id: '',
        userInfo: {}
    },

    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            //在localStorage中存储token,做持久化存储
            _setToken(action.payload)
        },
        setId(state, action) {
            state.id = action.payload
            localStorage.setItem('id', action.payload)
        },
        setUserInfonfo(state, action) {
            state.userInfo = action.payload
        }

    }

}
)

//解构出actionCreator
const { setToken, setId, setUserInfonfo } = userStore.actions


//获取reducer函数
const userReducer = userStore.reducer

//异步修改方法

//登录
const fetchLogin = (loginForm) => {
    return async (dispatch) => {

        //1.发送异步请求
        const res = await request.post('/auth/login', loginForm)


        //2.提交同步action进行token的存入
        dispatch(setToken(res.accessToken))

        //3.登录的时候把用户信息id存入localStorage
        dispatch(setId(res.id))
    }
}

//注册
const fetchRegister = (registerForm) => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await request.post('/users', registerForm)
        console.log(res);
    }
}

//获取用户信息
const fetchUserInfo = () => {
    return async (dispatch) => {

        //1.获取本地存储的id
        const id = localStorage.getItem('id')
        //2.发送异步请求
        const res = await request.get(`/users/${id}`)
        dispatch(setUserInfonfo(res))

    }
}

export { setToken, fetchLogin, fetchRegister, fetchUserInfo }

export default userReducer