import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Button, Descriptions, message, Space, Breadcrumb } from 'antd';
import { request } from '@/utils';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useCategoryList } from '@/hooks/useCategoryList';
import { useUserList } from '@/hooks/useUserList';
import './ProductDetail.scss'

const ProductDetail = () => {
    const { productId } = useParams();
    console.log("商品id：" + productId);
    const id = parseInt(productId);

    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    //获取分类列表
    const { categoryList, fetchCategory } = useCategoryList()

    //获取用户列表
    const { userList, fetchUsers } = useUserList()

    //用户ID到用户名的映射关系
    const [userNameMap, setUserNameMap] = useState({});

    //分类ID到分类名的映射关系
    const [categoryNameMap, setCategoryNameMap] = useState({});

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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const resp = await request.get(`/products/${id}`);
                console.log("请求成功");

                setProduct(resp);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                message.error('获取商品详情失败');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleEdit = () => {
        navigate(`/edit-product/${productId}`);
    };



    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product) {
        return <div>商品未找到</div>;
    }

    return (
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: <Link to={'/products'}>商品列表</Link> },
                        { title: '商品详情' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
        <div className='product-detail_container'>
                <Descriptions title={product.name} column={1}>
                    <Descriptions.Item label="商品名称">{product.name}</Descriptions.Item>
                    <Descriptions.Item label="商品描述">{product.description}</Descriptions.Item>
                    <Descriptions.Item label="分类">{categoryNameMap[product.categoryId] || '未分类'}</Descriptions.Item>
                    <Descriptions.Item label="价格">{product.price} 元</Descriptions.Item>
                    <Descriptions.Item label="库存">{product.number} 件</Descriptions.Item>
                    <Descriptions.Item label="创建人">{userNameMap[product.createUserId] || '未知用户'}</Descriptions.Item>
                    <Descriptions.Item label="更新人">{userNameMap[product.updateUserId] || '未知用户'}</Descriptions.Item>
                    <Descriptions.Item label="创建时间">{dayjs(product.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                    <Descriptions.Item label="更新时间">{dayjs(product.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</Descriptions.Item>
                </Descriptions>

        </div>
            <Button type="link" icon={<ArrowLeftOutlined />} onClick={()=>navigate('/products')} style={{ marginBottom: 20 }}>
                返回商品列表
            </Button>
            </Card>
    );
};

export default ProductDetail;
