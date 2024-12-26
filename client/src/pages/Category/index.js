import { Card, Button, DatePicker, Select, Breadcrumb } from 'antd'
import { Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
//import img404 from '@/assets/error.png'
import { useDispatch } from 'react-redux'
import { useCategoryList } from '@/hooks/useCategoryList'
import { Link } from 'react-router-dom'



const Article = () => {

    const dispatch = useDispatch()

    //准备列表的列数据
    const columns = [
        { title: '分类名称', dataIndex: 'name' },
        { title: '描述', dataIndex: 'description' },
        { title: '商品列表', dataIndex: 'product[]' },
        { title: '创建人', dataIndex: 'createUserId' },
        { title: '更新人', dataIndex: 'updateUserId' },
        { title: '创建时间', dataIndex: 'formatCreatedAt' },
        { title: '更新时间', dataIndex: 'formatUpdatedAt' },
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
    const categoryList = useCategoryList()

    return (
        <div className='product_container'>

            {/* 筛选功能区域 */}

            {/* 列表区域 */}
            <Card title={
                <Breadcrumb items={[
                    { title: <Link to={'/'}>首页</Link> },
                    { title: '分类管理' },
                ]} />
            }
                style={{ marginBottom: 20 }}>
                <Table rowKey="id" columns={columns} dataSource={categoryList} />
            </Card>


        </div>
    )
}

export default Article