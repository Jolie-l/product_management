import { Card, Button, Breadcrumb, Tooltip, Modal, Form, Input, message, Select } from 'antd'
import { Table, Space, Form as AntForm } from 'antd'
import { EditOutlined, DeleteOutlined,PlusOutlined } from '@ant-design/icons'
import { useUserList } from '@/hooks/useUserList'
import { Link } from 'react-router-dom'
import formatTimestamp from '@/components/formatTimestamp'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { request } from '@/utils'
import { useSelector } from 'react-redux'


const User = () => {
    const navigate = useNavigate()

    //获取用户列表
    const { userList, fetchUsers } = useUserList()

    //管理用户角色状态
    const [userRole, setUserRole] = useState('')

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editingUser, setEditingUser] = useState(null)

    //创建一个表单实体
    const [form] = Form.useForm();

    useEffect(() => {
        //从localStorage中获取用户角色
        const role = localStorage.getItem('identity')
        setUserRole(role)
    }, [])

    //准备列表的列数据
    const columns = [
        { title: '用户名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '身份', dataIndex: 'identity' },
        {
            title: '创建时间', dataIndex: 'createdAt', render: (text) => formatTimestamp(text),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), sortDescriptions: ['descend', 'ascend']
        },
        {
            title: '更新时间', dataIndex: 'updatedAt', render: (text) => formatTimestamp(text),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), sortDescriptions: ['descend', 'ascend']
        },
        {
            title: '操作',
            render: data => {
                const isSuperAdmin = userRole === 'SuperAdmin'
                return (
                    <Space size="middle">
                        {/* 使用三位运算符，条件渲染编辑和删除按钮 */}
                        {isSuperAdmin ? (
                            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => { showModal(data) }} />
                        ) : (
                            <Tooltip title="只有超级管理员才能编辑用户">
                                <Button type="primary" shape="circle" icon={<EditOutlined />} disabled />
                            </Tooltip>
                        )}
                        {isSuperAdmin ? (
                            <Button type="primary" danger shape="circle" icon={<DeleteOutlined />}
                                onClick={() => { handleDelete(data.id) }} />
                        ) : (
                            <Tooltip title="只有超级管理员才能删除用户">
                                <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} disabled />
                            </Tooltip>
                        )}
                    </Space>
                )
            }
        }
    ]


    //删除用户，二次确认框
    const handleDelete = async (userId) => {
        Modal.confirm({
            title: '确认删除？',
            content: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    // 发送删除请求到后端
                    await request.delete(`/users/${userId}`);

                    // 重新获取列表数据
                    fetchUsers();

                } catch (error) {
                    console.error('Failed to delete the user:', error);
                }
            }
        })
    }

    //展示编辑模态框
    const showModal = (user) => {
        setEditingUser(user)
        form.setFieldsValue(user)
        setIsModalVisible(true)
    }

    //编辑表单提交函数
    const handleEditFinish = async (values) => {
        if (!editingUser) return;
        try {
            await request.patch(`/users/${editingUser.id}`, values)
            message.success('编辑用户成功')
            setIsModalVisible(false)
            //重新获取列表数据
            fetchUsers()
        } catch (error) {
            message.error('编辑用户失败')
        }
    }

    //取消编辑模态框
    const handleCancel = () => {
        setIsModalVisible(false)
    }


    return (
        <div className='user_container'>

            {/* 筛选功能区域 */}
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '用户管理' },
                    ]} />
                }
                style={{ marginBottom: 20 }}>
                {/* 新增按钮 */}
                <div>
                    {userRole === 'SuperAdmin' && (
                        <Button type='primary' onClick={() => navigate('/add-user')}><PlusOutlined/>新增用户</Button>
                    )}
                </div>
            </Card>

            {/* 列表区域 */}
            <Card >
                <Table rowKey="id" columns={columns} dataSource={userList} 
                   //分页功能
                   pagination={{
                    pageSize: 8,
                    showTotal: (total, range) => `共 ${total} 条数据`,
                    onChange: (page, pageSize) => {
                        fetchUsers( page, pageSize)
                    }
                }}/>
            </Card>

            {/* 编辑用户模态框 */}
            <Modal
                title="编辑用户"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={form.submit}>
                        确认
                    </Button>,
                ]}
            >
                <AntForm
                    form={form}
                    layout="vertical"
                    onFinish={handleEditFinish}
                >
                    <Form.Item name="id" label="用户ID" style={{ display: 'none' }}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="name" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="identity" label="身份" rules={[{ required: true, message: '请选择身份' }]}>
                        <Select>
                            <Select.Option value="SuperAdmin">SuperAdmin</Select.Option>
                            <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>
                </AntForm>
            </Modal>


        </div>
    )
}

export default User