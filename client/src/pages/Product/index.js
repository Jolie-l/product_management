import { Card, Button, Select, Input, Modal, Table, Space, Form, message, Upload } from 'antd'
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
//import img404 from '@/assets/error.png'
import { useDispatch } from 'react-redux'
import { Breadcrumb, Form as AntForm } from 'antd'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useUserList } from '@/hooks/useUserList'
import { Link, useNavigate } from 'react-router-dom'
import { request } from '@/utils'
import { useProductList } from '@/hooks/useProductList'
import { useState } from 'react'
import { useEffect } from 'react'
import './index.scss';
import dayjs from 'dayjs';




const Product = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()


    //获取商品列表
    const { productList, fetchProducts, } = useProductList(); // 获取产品列表和函数

    //获取分类列表
    const { categoryList, fetchCategory } = useCategoryList()

    //获取用户列表
    const { userList, fetchUsers } = useUserList()

    //用户ID到用户名的映射关系
    const [userNameMap, setUserNameMap] = useState({});

    //分类ID到分类名的映射关系
    const [categoryNameMap, setCategoryNameMap] = useState({});

    useEffect(()=>{
        fetchCategory();
        fetchUsers();
    },[fetchCategory, fetchUsers])

    useEffect(() => {
        // 构建用户ID到用户名的映射关系
        const map = userList.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});
        setUserNameMap(map);

        // 构建分类ID到分类名的映射关系
        const categoryMap = categoryList.reduce((acc, category) => {
            acc[category.id] = category.name;
            return acc;
        }, {});
        setCategoryNameMap(categoryMap);
    }, [userList, categoryList]);

    //准备列表的列数据
    const columns = [

        { title: '商品名称', dataIndex: 'name' },
        // { title: '商品描述', dataIndex: 'description' },
        {
            title: '分类', dataIndex: 'categoryId',
            render: (categoryId) => categoryNameMap[categoryId] || '-'
        },
        {
            title: '价格', dataIndex: 'price',
            sorter: (a, b) => a.price - b.price, sortDescriptions: ['descend', 'ascend']
        },
        { title: '库存', dataIndex: 'number' },
        { title: '创建人', dataIndex: 'createUserId', render: (userId) => userNameMap[userId] || '-' },
        //  { title: '更新人', dataIndex: 'updateUserId', render: (userId) => userNameMap[userId] || '-' },
        {
            title: '创建时间', dataIndex: 'createdAt', render: (text) => formatTimestamp(text),
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), sortDescriptions: ['descend', 'ascend']
        },
        //    { title: '更新时间', dataIndex: 'updatedAt', render: (text) => formatTimestamp(text), },
        {
            title: '操作',
            render: (data) => {
                return (
                    <Space size="middle">
                        <Button
                            type='primary'
                            shape='circle'
                            icon={<QuestionCircleOutlined />}
                            onClick={() => navigate(`/product-detail/${data.id}`, { state: data })} // 详情按钮的点击事件
                        />
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(data)} // 显示编辑模态框
                        />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(data.id)} // 删除按钮的点击事件
                        />
                    </Space>
                )
            }
        }
    ]

    const { Option } = Select
    const { Search } = Input

    // 编辑模态框相关状态
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    // 编辑商品列表相关状态
    const [currentProduct, setCurrentProduct] = useState(null)
    const [form] = AntForm.useForm();


    //筛选功能实现
    const onFinish = (formValue) => {
        console.log(formValue.createUserId, formValue.categoryId)
        //将筛选条件放入请求参数中
        // 根据筛选条件调用 fetchProducts
        fetchProducts(formValue.categoryId, formValue.createUserId);
    }

    // 清空筛选条件
    const handleClear = () => {
        // 将筛选条件清空
        fetchProducts();
    }

    // 搜索功能实现
    const onSearch = (value) => {
        fetchProducts(null, null, value);
    };

    // 取消搜索功能
    const handleCancelSearch = () => {
        fetchProducts();
    }

    // 时间格式化函数
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '-'; // 如果没有值，返回一个默认提示
        const date = new Date(timestamp);
        return dayjs(timestamp).format('YYYY-MM-DD') // 使用本地化字符串格式，可以根据需要调整
    };

    // 删除商品的功能,二次确认弹窗
    const handleDelete = async (productId) => {
        Modal.confirm({
            title: '确认删除？',
            content: '确认删除？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                try {
                    // 发送删除请求到后端
                    await request.delete(`/products/${productId}`);
                    console.log(`Product with id ${productId} deleted successfully`);
                    // 重新获取列表数据
                    fetchProducts();

                } catch (error) {
                    console.error('Failed to delete the product:', error);
                }
            }
        })
    };

    // 显示编辑模态框
    const handleEdit = (product) => {
        setCurrentProduct(product);
        form.setFieldsValue(product); // 设置表单初始值
        setIsEditModalVisible(true);
    };

    // 处理编辑表单提交
    const handleEditFinish = async (values) => {
        if (!currentProduct) return;

        //自动设置更新人为当前用户
        const currentUserId = parseInt(localStorage.getItem('id'))
        const updatedValues = {
            ...values,
            price: Number(values.price),
            number: Number(values.number),
            updateUserId: currentUserId
        }

        console.log('编辑商品:', updatedValues);


        try {
            const resp = await request.patch(`/products/${currentProduct.id}`, updatedValues);
            console.log('编辑商品成功:', resp);
            message.success('编辑商品成功');
            setIsEditModalVisible(false);
            fetchProducts(); // 刷新产品列表
        } catch (error) {
            console.error('编辑商品失败:', error);
            message.error('编辑商品失败');
        }
    };

    // 取消编辑模态框
    const handleCancelEdit = () => {
        setIsEditModalVisible(false);
    };

    return (
        <div className='product_container'>

            {/* 顶部功能区域 */}
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '商品管理' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
                    {/* 分类、创建人、搜索框 */}
                    <div >
                        <Form.Item label="分类" name="categoryId" className="select">
                            <Select
                                placeholder="请选择分类"
                                showSearch //搜索功能
                                style={{ width: 200 }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // 自定义筛选逻辑
                                }
                            >
                                {categoryList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item label="创建人" name="createUserId" className="select">
                            <Select
                                placeholder="请选择创建人"
                                showSearch //搜索功能
                                style={{ width: 200 }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // 自定义筛选逻辑
                                }
                            >
                                {userList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item className='btn'>
                            <Button type="primary" htmlType="submit" >
                                筛选
                            </Button>
                        </Form.Item>

                        <Form.Item className='btn'>
                            <Button type="primary" htmlType="reset" onClick={handleClear}>
                                清空
                            </Button>
                        </Form.Item>
                    </div>

                    {/* 添加搜索框 */}
                    <div>
                        <Search
                            placeholder="请输入商品名称"
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
                        <Button type='primary' onClick={() => navigate('/add-product')}>新增商品</Button>
                    </div>
                </Form>
            </Card>

            {/* 编辑商品模态框 */}
            <Modal
                title="编辑商品"
                visible={isEditModalVisible}
                onCancel={handleCancelEdit}
                footer={[
                    <Button key="back" onClick={handleCancelEdit}>
                        取消
                    </Button>,
                    <Button key="submit" type="primary" onClick={form.submit}>
                        确认
                    </Button>,
                ]}
            >
                <AntForm form={form} layout="vertical" onFinish={handleEditFinish}>

                    <AntForm.Item name="name" label="商品名称" rules={[{ required: true, message: '请输入商品名称' }]}>
                        <Input />
                    </AntForm.Item>
                    <AntForm.Item name="description" label="商品描述" rules={[{ message: '请输入商品描述' }]}>
                        <Input />
                    </AntForm.Item>
                    <AntForm.Item name="categoryId" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
                        <Select
                            placeholder="请选择分类"
                            showSearch
                            style={{ width: 200 }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categoryList.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                        </Select>
                    </AntForm.Item>
                    <AntForm.Item name="createUserId" label="创建人" rules={[{ required: true, message: '请选择创建人' }]} initialValue={currentProduct ? currentProduct.createUserId : null} >
                        <Select
                            disabled={true} // 禁用该字段
                        >

                        </Select>
                    </AntForm.Item>
                    <AntForm.Item name="price" label="价格" rules={[{ required: true, message: '请输入价格' },
                    { type: 'number', transform: (value) => parseInt(value) }
                    ]}>
                        <Input type="number" />
                    </AntForm.Item>
                    <AntForm.Item name="number" label="库存" rules={[{ required: true, message: '请输入库存' },
                    { type: 'number', transform: (value) => parseInt(value) }
                    ]}>
                        <Input type='number' />
                    </AntForm.Item>
                </AntForm>
            </Modal>

            {/* 列表区域 */}
            <Card title={`商品列表`}>
                <Table rowKey="id"
                    columns={columns}
                    dataSource={productList}
                    //分页功能
                    pagination={{
                        pageSize: 8,
                        onChange: (page, pageSize) => {
                            fetchProducts(null, null, null, page, pageSize)
                        }
                    }} />
            </Card>


        </div>
    )
}

export default Product