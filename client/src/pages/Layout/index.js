import { Layout, Menu, Popconfirm } from 'antd'
import {
    HomeOutlined,
    DiffOutlined,
    EditOutlined,
    LogoutOutlined,
    SolutionOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchUserInfo } from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'

const { Header, Sider } = Layout

const items = [
    {
        label: '首页',
        key: '/',
        icon: <HomeOutlined />,
    },
    {
        label: '商品管理',
        key: '/products',
        icon: <DiffOutlined />,
    },
    {
        label: '分类管理',
        key: '/categories',
        icon: <EditOutlined />,
    },
    {
        label: '用户管理',
        key: '/users',
        icon: <SolutionOutlined />,
    },

]

const GeekLayout = () => {

    // 路由跳转的钩子函数
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //触发用户信息action
    useEffect(() => {
        dispatch(fetchUserInfo())
    }, [dispatch])

    //获取redux中的用户信息
    const email = useSelector((state) => state.user.userInfo.email)

    // 菜单点击路由跳转 
    const onMenuClick = (route) => {
        const path = route.key
        navigate(path)
    }

    //左侧导航栏高亮显示当前路由
    const location = useLocation()
    const selectedKey = location.pathname

    //点击确认退出按钮的逻辑
    const onConfirm = () => {
        //清除本地存储的token和用户信息
        localStorage.removeItem('token_key')
        navigate('/login')
    }

    return (
        <Layout className="layout-container">
            {/* 顶部 */}
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    <span className="user-name">{email}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                            <LogoutOutlined /> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            {/* 主体 */}
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
                {/* 左侧导航栏 */}
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[1]}
                        selectedKeys={selectedKey}
                        onClick={onMenuClick}
                        items={items}
                        style={{ height: '100%', borderRight: 0 }}></Menu>
                </Sider>

                {/* 二级路由组件渲染的位置 */}
                <Layout style={{ overflowY: 'auto' }}>
                    <div style={{ height: '100%', overflowY: 'auto' }}>
                        <Outlet />
                    </div>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default GeekLayout