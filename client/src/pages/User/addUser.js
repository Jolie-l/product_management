// src/pages/AddUser.js
import { Button, Form, Input, Select, message, Breadcrumb, Space, Card } from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { request } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './addUser.scss'

const AddUser = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [userRole, setUserRole] = useState('')

    const [categoryList, setCategoryList]=useState([]) // 分类列表

    // 模拟获取用户角色信息，实际项目中可能从上下文或API获取
    useEffect(() => {
        // 假设通过某种方式获取用户角色信息
        const role = localStorage.getItem('userRole') // 从localStorage获取用户角色
        if (role) {
            setUserRole(role)
        }
    }, [])

    // 新增用户的处理函数
    const handleAddFinish = async (values) => {
        try {
            await request.post('/users', values)
            message.success('新增用户成功')
            navigate('/users') // 导航回用户列表页面

        } catch (error) {
            message.error('新增用户失败')
        }
    }

    // 取消新增用户的处理函数
    const handleCancel = () => {
        navigate('/users') // 导航回用户列表页面
    }

    return (

        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: <Link to={'/users'}>用户管理</Link> },
                    { title: '新增用户' },
                ]} />
            }
            style={{ marginBottom: 20 }}>
            <div className='add_user_container'>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddFinish}
                    initialValues={{ identity: 'Admin',password:'123456' }} // 默认选择Admin
                >
                    <Form.Item name="name" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="identity" label="身份" rules={[{ required: true, message: '请选择身份' }]}>
                        <Select>
                            <Select.Option value="SuperAdmin">SuperAdmin</Select.Option>
                            <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{marginTop: 40}}>
                        <Space size="middle">
                            <Button type="primary" htmlType="submit"><PlusOutlined/>确认新增</Button>
                            <Button onClick={handleCancel}>取消</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </Card>


    )
}

export default AddUser