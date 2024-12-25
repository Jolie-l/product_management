import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useUserList } from '@/hooks/useUserList'
import { Link } from 'react-router-dom'
//引入汉化包 时间选择器设置为中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
const ProductSelector = () => {
    //获取分类列表
    const { categoryList } = useCategoryList()

    //获取用户列表
    const { userList } = useUserList()

    const { RangePicker } = DatePicker
    const { Option } = Select

    return (
        <div>
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: '商品管理' },
                    ]} />
                }
                style={{ marginBottom: 20 }}
            >
                <Form initialValues={{ status: '' }}>
                <div >
                    <Form.Item label="分类" className="select">
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
                    <Form.Item label="创建人" className="select">
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
                    <Form.Item label="更新人" className="select">
                        <Select
                            placeholder="请选择更新人"
                            showSearch //搜索功能
                            style={{ width: 200 }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 // 自定义筛选逻辑
                            }
                        >
                            {userList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    </div>

                    <Form.Item label="创建日期" className="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>
                    <Form.Item label="更新日期" className="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item className='btn'>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
                            筛选
                        </Button>
                    </Form.Item>

                    <Form.Item className='btn'>
                        <Button type="primary" htmlType="reset" style={{ marginLeft: 40 }}>
                            清空
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        </div>
    )
}

export default ProductSelector;
