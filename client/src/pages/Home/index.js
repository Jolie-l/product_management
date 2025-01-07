// src/pages/Home/index.js
import React from 'react'
import { Card, Button, Typography, Image, Space, List } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'
import logo from '@/assets/logo.png'
import pro1 from '@/assets/pro1.png'
import pro2 from '@/assets/pro2.png'
import pro3 from '@/assets/pro3.png'
import { useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const Home = () => {

    const navigate = useNavigate()
    const sampleProducts = [
        { id: 41, name: 'vivo iQOO Z9', description: '8GB+256GB 曜夜黑 6000mAh 蓝海电池 1.5K 144Hz 护眼屏 第三代骁龙 7 电竞手机', imageUrl: pro1 },
        { id: 42, name: '华为mate60 pro', description: '新品手机鸿蒙系统512G大内存6.95英寸屏NFC 【鎏金黑】512GB 官方标配', imageUrl: pro2 },
        { id: 43, name: ' 小米14 Pro', description: 'Redmi Note14Pro+ 三代骁龙7S ip68防水 5G 手机 子夜黑16GB+512GB 官方标配', imageUrl: pro3 },
      
    ]

    return (
        <div className="home_container">
            {/* 欢迎卡片 */}
            <Card className="welcome_card">
                <Image
                    src={logo}
                    alt="Welcome Banner"
                    preview={false}
                    className="welcome_banner"
                />
                <Title level={2} className="welcome_title">欢迎来到我们的电商管理平台</Title>

            </Card>

            {/* 商品列表卡片 */}
            <Card className="products_card">
                <Title level={3} className="products_title">特色商品展示</Title>
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={sampleProducts}
                    renderItem={(item) => (
                        <List.Item  onClick={()=>{navigate(`/product-detail/${item.id}`)}} style={{cursor:'pointer'}}>
                            <Card className="product_item">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    preview={false}
                                    className="product_image"
                                />
                                <Title level={4} className="product_name">{item.name}</Title>
                                {/*    <Text className="product_description">{item.description}</Text> */}
                            </Card>
                        </List.Item>
                    )}
                />
            </Card>

            {/* 导航卡片 */}
            <Card className="navigation_card">
                <Title level={3} className="navigation_title">快速导航</Title>
                <Space direction="horizontal" size="medium" className="navigation_space">
                    <Link to="/add-product">
                        <Button type="primary" size="large" className="navigation_button">
                            新增商品
                        </Button>
                    </Link>
                    <Link to="/add-category">
                        <Button type="primary" size="large" className="navigation_button">
                            新增分类
                        </Button>
                    </Link>
                    <Link to="/edit-current-user">
                        <Button type="primary" size="large" className="navigation_button">
                            修改个人用户信息
                        </Button>
                    </Link>
                </Space>
            </Card>
        </div>
    )
}

export default Home
