import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.jpg'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'


// 登录页面
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // 表单提交的回调函数
    const onFinish = async (values) => {

        //触发异步action，fetchLogin，等异步请求完全成功后跳转到首页
        await dispatch(fetchLogin(values))
        //跳转到首页
        navigate('/')
        //弹窗提醒用户登录成功
        message.success('登录成功')
    }

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                {/* 表单验证 */}
                <Form onFinish={onFinish} validateTrigger="onBlur">  {/* onBlur：失去焦点时触发验证 */}
                    <Form.Item
                        name={'email'}
                        /* rules：验证规则，多条规则按顺序执行 */
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: 'Please enter a valid email!',
                            }
                        ]}>
                        <Input size="large" placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}>
                        <Input size="large" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>

                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login