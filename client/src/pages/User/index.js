import { Card, Button, Breadcrumb } from 'antd'
import { Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useUserList } from '@/hooks/useUserList'
import { Link } from 'react-router-dom'




const Article = () => {

    //准备列表的列数据
    const columns = [
        { title: '用户名', dataIndex: 'name' },
        { title: '邮箱', dataIndex: 'email' },
        { title: '创建的商品列表', dataIndex: 'product[]' },
        //    { title: '更新的商品列表', dataIndex: 'product[]' },
        { title: '创建的分类列表', dataIndex: 'product[]' },
        //  { title: '更新的商品列表', dataIndex: 'product[]' },
        { title: '创建时间', dataIndex: 'createdAt' },
        { title: '更新时间', dataIndex: 'updatedAt' },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined />} />
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                        />
                    </Space>
                )
            }
        }
    ]

    //获取分类列表
    const {userList,fetchUsers}=useUserList()

    return (
        <div className='product_container'>

            {/* 筛选功能区域 */}

            {/* 列表区域 */}
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '用户管理' },
                ]} />
            }
                style={{ marginBottom: 20 }}>
                <Table rowKey="id" columns={columns} dataSource={userList} />
            </Card>


        </div>
    )
}

export default Article