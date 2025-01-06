import { Card, Button, Breadcrumb, Input, Form, Modal, message,  } from 'antd'
import { Table, Space } from 'antd'
import { Form as AntForm } from 'antd'
import { EditOutlined, DeleteOutlined, EllipsisOutlined ,ZoomInOutlined,DoubleRightOutlined} from '@ant-design/icons'
//import img404 from '@/assets/error.png'
import { useDispatch } from 'react-redux'
import { useCategoryList } from '@/hooks/useCategoryList'
import { Link } from 'react-router-dom'
import formatTimestamp from '@/components/formatTimestamp'
import { useEffect, useState } from "react";
import { request } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { useUserList } from '@/hooks/useUserList'



const Category = () => {

    const navigate = useNavigate()

    const { Search } = Input
    const { Option } = Input

    // 编辑模态框相关状态
    const [isModalVisible, setIsModalVisible] = useState(false)

    // 编辑分类列表相关状态
    const [currentCategory, setCurrentCategory] = useState(null)

    //创建一个表单实体
    const [form] = Form.useForm();

    //获取分类列表
    const { categoryList, fetchCategory } = useCategoryList()

    //获取用户列表
    const { userList, fetchUsers } = useUserList()

    //获取商品列表

    //用户ID到用户名的映射关系
    const [userNameMap, setUserNameMap] = useState({});

    // 商品描述模态框相关状态
    const [isDecModalVisible, setIsDecModalVisible] = useState(false)
    const [modalContent, setModalContent] = useState('')

    useEffect(() => {
        // 构建用户ID到用户名的映射关系
        const map = userList.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});
        setUserNameMap(map);
    }, [userList])

    //准备列表的列数据
    const columns = [
        { title: '分类名称', dataIndex: 'name' },
        {
            title: '描述',
            dataIndex: 'description',
            key: 'description',
            render: (text, record) => {
                if (text) {
                    return (
                        <>
                            {text.slice(0, 10)}
                            {text.length > 10 && (
                                <>
                                    
                                    <EllipsisOutlined style={{ marginLeft: 8 }} onClick={() => showDesModal(record.description)} />
                                </>
                            )}
                        </>
                    );
                }
                return text; // 如果描述是 null 或 undefined，则直接返回
            },
        },
        // { title: '商品列表', dataIndex: 'product[]' },
        { title: '创建人', dataIndex: 'createUserId', render: (userId) => userNameMap[userId] || '-' },
        { title: '更新人', dataIndex: 'updateUserId', render: (userId) => userNameMap[userId] || '-' },
        {
            title: '创建时间', dataIndex: 'createdAt', render: (text) => formatTimestamp(text),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), sortDescriptions: ['descend', 'ascend']
        },
        { title: '更新时间', dataIndex: 'updatedAt', render: (text) => formatTimestamp(text), },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => showModal(data)} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(data.id)}
                        />
                    </Space>
                )
            }
        }
    ]


    // 搜索功能
    const onSearch = (value) => {
        fetchCategory(null, value)
    }

    // 取消搜索功能
    const handleCancelSearch = () => {
        fetchCategory();
    }

    //展示编辑模态框
    const showModal = (category) => {
        setCurrentCategory(category)
        form.setFieldsValue(category) // 表单初始值
        setIsModalVisible(true)
    }

    //编辑表单提交函数
    const handleEditFinish = async (values) => {
        if (!currentCategory) return;

        //将更新人设置为当前用户
        const currentUserId = parseInt(localStorage.getItem('id'));
        const updatedValues = {
            ...values,
            updateUserId: currentUserId,
        }

        try {
            const res = await request.patch(`/categories/${currentCategory.id}`, updatedValues)

            message.success('编辑分类成功')
            setIsModalVisible(false)
            // 更新分类列表
            fetchCategory()

        } catch (error) {
            message.error('编辑分类失败')
        }
    }

    //取消编辑模态框
    const handleCancel = () => {
        setIsModalVisible(false)
    }

    // 删除商品的功能,二次确认弹窗
    const handleDelete = async (categoryId) => {
        Modal.confirm({
            title: '确认删除？',
            content: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    // 发送删除请求到后端
                    await request.delete(`/categories/${categoryId}`);

                    // 重新获取列表数据
                    fetchCategory();

                } catch (error) {
                    console.error('Failed to delete the product:', error);
                }
            }
        })
    };

    //展示描述模态框
    const showDesModal = (description) => {
        setModalContent(description)
        setIsDecModalVisible(true)
    }

    // 点击确认关闭描述模态框
    const handleDesOk = () => {
        setIsDecModalVisible(false)
    }

    //点击取消关闭模态框
    const handleDesCancel = () => {
        setIsDecModalVisible(false)
    }

    return (
        <div className='product_container'>

            {/* 顶部功能区域 */}
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '分类管理' },
                ]} />
            }
                style={{ marginBottom: 20 }}>

                {/* 添加搜索框 */}
                <div>
                    <Search
                        placeholder="请输入分类名称"
                        onSearch={onSearch}
                        enterButton
                        style={{ width: 300, marginBottom: 20 }} // 可适当设置样式
                    />
                    <Button
                        onClick={handleCancelSearch}
                        style={{ marginLeft: 10 }} // 调整左侧边距
                    >
                        重置
                    </Button>
                </div>

                {/* 新增按钮 */}
                <div>
                    <Button type='primary' onClick={() => navigate('/add-category')}>新增分类</Button>
                </div>

            </Card>

            {/* 列表区域 */}
            <Card>
                <Table rowKey="id" columns={columns}
                    dataSource={categoryList}
                    //分页功能
                    pagination={{
                        pageSize: 8,
                        onChange: (page, pageSize) => {
                            fetchCategory(null, null, page, pageSize)
                        }
                    }} />
            </Card>

            {/* 完整描述模态框 */}
            <Modal title="完整描述" visible={isDecModalVisible} onOk={handleDesOk} onCancel={handleDesCancel}>
                <p>{modalContent}</p>
            </Modal>

            {/* 编辑分类的模态框 */}
            <Modal
                title="编辑分类"
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
                    <AntForm.Item
                        name="name"
                        label="分类名称"
                        rules={[{ required: true, message: '请输入分类名称' }]}
                    >
                        <Input />
                    </AntForm.Item>
                    <AntForm.Item
                        name="description"
                        label="描述"
                        rules={[{ max: 200, message: '描述不能超过200字' }]}
                    >
                        <Input.TextArea
                            rows={5}
                            maxLength={200} // 设置最大输入长度
                            onChange={(e) => {
                                form.setFieldsValue({ description: e.target.value })
                            }}
                        />
                    </AntForm.Item>
                    {/* 其他表单项根据需要添加 */}
                </AntForm>
            </Modal>



        </div>
    )
}

export default Category