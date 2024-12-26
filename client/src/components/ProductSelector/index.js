import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { useCategoryList } from '@/hooks/useCategoryList'
import { useUserList } from '@/hooks/useUserList'
import { Link } from 'react-router-dom'
//引入汉化包 时间选择器设置为中文
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import { useEffect, useState } from 'react'
import { request } from '@/utils'
const ProductSelector = () => {
    //获取分类列表
    const categoryList = useCategoryList()

    //获取用户列表
    const userList = useUserList()

    const { RangePicker } = DatePicker
    const { Option } = Select



    //筛选功能实现

    //准备参数
    const [reqData, setReqData] = useState({
        categoryId: '',
        createUserId: '',
        updateUserId: '',
        begin_createdAt: '',
        end_createdAt: '',
        begin_updatedAt: '',
        end_updatedAt: '',
    })
    const onFinish = (formValue) => {
        console.log(formValue)
        //将筛选条件放入请求参数中
        setReqData({
            ...reqData,
            categoryId: formValue.categoryId,
            createUserId: formValue.createUserId,
            updateUserId: formValue.updateUserId,
            begin_createdAt: formValue.createdAt[0].format('YYYY-MM-DD'),
            end_createdAt: formValue.createdAt[1].format('YYYY-MM-DD'),
            begin_updatedAt: formValue.updatedAt[0].format('YYYY-MM-DD'),
            end_updatedAt: formValue.updatedAt[1].format('YYYY-MM-DD'),
        })
    }

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
                <Form initialValues={{ status: '' }} onFinish={onFinish}>
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
                        <Form.Item label="更新人" name="updateUserId" className="select">
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

                    <Form.Item label="创建日期" name="createdAt" className="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>
                    <Form.Item label="更新日期" name="updatedAt" className="date">
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
