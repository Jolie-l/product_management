import { Card,  Button, DatePicker, Select } from 'antd'
import { Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
//import img404 from '@/assets/error.png'
import { useDispatch } from 'react-redux'
import { useProductList } from '@/hooks/useProductList'
import  ProductSelector  from '@/components/ProductSelector/index'


const Article = () => {

    const dispatch = useDispatch()
    //准备列表的列数据
    const columns = [
        { title: '图片', dataIndex: 'image' },
        { title: '商品名称', dataIndex: 'name' },
        { title: '商品描述', dataIndex: 'description' },
        { title: '分类', dataIndex: 'categoryId' },
        { title: '价格', dataIndex: 'price' },
        { title: '库存', dataIndex: 'number' },
        { title: '创建人', dataIndex: 'createUserId' },
        { title: '更新人', dataIndex: 'updateUserId' },
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

    //获取商品列表
    const productList = useProductList()

    return (
        <div className='product_container'>

            {/* 筛选功能区域 */}
            <ProductSelector />
            {/* 列表区域 */}
            <Card title={`商品列表`}>
                <Table rowKey="id" columns={columns} dataSource={productList} />
            </Card>
        </div>
    )
}

export default Article