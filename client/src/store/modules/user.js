//和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { setToken as _setToken, getToken } from "@/utils";

const userStore = createSlice({
    name: "user",

    //数据初始化状态
    initialState: {
        token: getToken() || ''
    },

    //同步修改方法
    reducers: {
        setToken(state, action) {
            state.token = action.payload

            //在localStorage中存储token,做持久化存储
            _setToken(action.payload)
        }
    }
})

//解构出actionCreator
const { setToken } = userStore.actions

//获取reducer函数
const userReducer = userStore.reducer

//异步修改方法
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await request.post('/auth/login', loginForm)
        //2.提交同步action进行token的存入
        dispatch(setToken(res.accessToken))

    }
}

const fetchRegister = (registerForm) => {
    return async (dispatch) => {
        //1.发送异步请求
        const res = await request.post('/users', registerForm)
        console.log(res);
    }
}

export { setToken, fetchLogin ,fetchRegister}

export default userReducer