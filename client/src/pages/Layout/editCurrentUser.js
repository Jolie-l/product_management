// src/pages/EditCurrentUser.js
import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Input, message, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { request } from '@/utils'
import './editCurrentUser.scss'


const EditCurrentUser = () => {
    const navigate = useNavigate()


    const [form] = Form.useForm()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // 获取当前用户ID
    const currentUserId = parseInt(localStorage.getItem('id'), 10)


    // 获取当前用户信息
    useEffect(() => {
        const fetchUserInfo = async () => {
            setLoading(true)
            try {
                const response = await request.get(`/users/${currentUserId}`)
                setUserInfo(response)
                form.setFieldsValue(response) // 设置表单初始值
            } catch (error) {
                console.error('获取当前用户信息失败:', error)
                message.error('获取当前用户信息失败')
                navigate('/') // 导航回用户列表页面
            } finally {
                setLoading(false)
            }
        }

        fetchUserInfo()
    }, [currentUserId, form, navigate]) // 确保依赖项正确设置


    // 修改当前用户信息的处理函数
    const handleEdit = async (values) => {
        setLoading(true)
        setError(null)
        const newValues = {
            ...values,
            identity: userInfo.identity
        }
        try {
            await request.patch(`/users/${currentUserId}`, newValues)

            message.success('用户信息修改成功')
            navigate('/login') // 导航回首页
        } catch (err) {
            console.error('修改失败:', err)
            setError(err)
            message.error('用户信息修改失败')
        } finally {
            setLoading(false)
        }
    }

    // 取消修改当前用户信息的处理函数
    const handleCancel = () => {
        navigate('/') // 导航回用户列表页面
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    if (!userInfo) {
        return <div>用户信息未找到</div>
    }

    return (

        <Card >
            <div className='edit_current_user_container'>
                <h2>修改个人信息</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEdit}
                    initialValues={userInfo}
                >
                    <Form.Item name="name" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码!' }, { min: 6, message: '密码长度至少6位!' }, { max: 20, message: '密码长度不能超过20位!' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'left' }}>
                        <Space size="middle">
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button onClick={handleCancel}>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </Card>

    )
}

export default EditCurrentUser
