import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select, message, Card, Breadcrumb, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCategoryList } from '@/hooks/useCategoryList';
import { useUserList } from '@/hooks/useUserList';
import { request } from '@/utils';
import { Link, useNavigate } from 'react-router-dom';
import './index.scss'

const AddProduct = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const { categoryList, fetchCategory } = useCategoryList();
    const { userList, fetchUsers } = useUserList();

    // 用户ID到用户名的映射关系
    const [userNameMap, setUserNameMap] = useState({})

    useEffect(() => {
        fetchCategory();
        fetchUsers();
    }, [fetchCategory, fetchUsers])

    useEffect(() => {
        // 构建用户ID到用户名的映射关系
        const map = userList.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});
        setUserNameMap(map);
    }, [userList]);


    const onFinish = async (values) => {
        setLoading(true);
        try {
            // 自动设置创建人为当前用户
            const currentUserId = parseInt(localStorage.getItem('id'));
            const newProduct = {
                ...values,
                price: Number(values.price),
                number: Number(values.number),
                createUserId: currentUserId,
                updateUserId: currentUserId,
            };

            console.log('新增商品:', newProduct);

            // 发送新增商品请求到后端
            await request.post('/products', newProduct);
            message.success('新增商品成功');
            setLoading(false);

            // 跳转回商品列表页面
            navigate('/products');
        } catch (error) {
            console.error('新增商品失败:', error);
            message.error('新增商品失败');
            setLoading(false);
        }
    };

    return (
        <Card title={
            <Breadcrumb items={[
                { title: <Link to={'/'}>首页</Link> },
                { title: <Link to={'/products'}>商品管理</Link> },
                { title: '新增商品' },
            ]} />
        }
            style={{ marginBottom: 20 }}>
            <div className='add-product_container'>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
                    <Form.Item
                        name="name" label="商品名称"
                        rules={[
                            { required: true, message: '请输入商品名称' },
                            { max: 30, message: '商品名称不能超过30字' }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description" label="商品描述"
                        rules={[
                            { message: '请输入商品描述' },
                            { max: 200, message: '商品描述不能超过200字' }
                        ]}>

                        <Input.TextArea
                            rows={5}
                            maxLength={200} // 设置最大输入长度
                            onChange={(e) => {
                                form.setFieldsValue({ description: e.target.value })
                            }}
                        />

                    </Form.Item>
                    <Form.Item
                        name="categoryId" label="分类"
                        rules={[{ required: true, message: '请选择分类' }]}>
                        <Select
                            placeholder="请选择分类"
                            showSearch // 搜索功能
                            style={{ width: 200 }}
                            filterOption={(input, option) =>
                                // 自定义筛选逻辑
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categoryList.map(item => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="price" label="价格"
                        rules={[{ required: true, message: '请输入价格' },
                        { type: 'number', transform: (value) => parseInt(value) }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="number" label="库存"
                        rules={[{ required: true, message: '请输入库存' },
                        { type: 'number', transform: (value) => parseInt(value) }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<PlusOutlined />}>
                            确认新增
                        </Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => navigate('/products')}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Card>

    );
};

export default AddProduct;
