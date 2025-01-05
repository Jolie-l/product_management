// src/pages/AddCategory.js
import { Card, Button, Input, Form, message, Breadcrumb, Select } from 'antd'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '@/utils'
import { useState, useEffect } from 'react'
import './addCategory.scss'
import formatTimestamp from '@/components/formatTimestamp'
import { useUserList } from '@/hooks/useUserList'

const AddCategory = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // 获取用户列表
    const { userList, fetchUsers } = useUserList()

    // 用户ID到用户名的映射关系
    const [userNameMap, setUserNameMap] = useState({})
    const [form] = Form.useForm()

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    useEffect(() => {
        // 构建用户ID到用户名的映射关系
        const map = userList.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});
        setUserNameMap(map);
    }, [userList]);

    // 处理新增表单提交
    const handleAddFinish = async (values) => {
        // 自动设置创建人为当前用户
        const currentUserId = parseInt(localStorage.getItem('id'), 10);
        const newCategory = {
            ...values,
            createUserId: currentUserId,
            updateUserId: currentUserId
        }

        try {
            const resp = await request.post('/categories', newCategory);
            console.log('新增分类成功:', resp);
            message.success('新增分类成功');
            navigate('/categories'); // 返回分类管理页面
        } catch (error) {
            console.error('新增分类失败:', error);
            message.error('新增分类失败');
        }
    };

    return (


        <Card
            title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: <Link to={'/category'}>分类管理</Link> },
                    { title: '新增分类' },
                ]} />
            }
            style={{ marginBottom: 20 }}>

            <div className='add_category_container'>
                <Form form={form} layout="vertical" onFinish={handleAddFinish}>

                    <Form.Item name="name" label="分类名称" rules={[{ required: true, message: '请输入分类名称' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="description" label="描述">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name="createUserId" label="创建人" initialValue={parseInt(localStorage.getItem('id'), 10)}>
                        <Select disabled={true} style={{ width: 200 }}>
                            {userList.map(item => (
                                <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                            确认
                        </Button>
                        <Button onClick={() => navigate('/category')}>
                            取消
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        </Card>


    )
}

export default AddCategory
