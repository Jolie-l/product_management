import React, { useState } from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '@/store/modules/user';
import {ArrowRightOutlined} from '@ant-design/icons'


const Register = () => {
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsVisible(true);
    };

    const handleCancel = () => {
        setIsVisible(false);
        form.resetFields();  // 重置表单字段
    };

    const onFinish = async (values) => {

        try {
            // 发送请求到后端进行注册
            await dispatch(fetchRegister(values))

            // 提交成功后关闭弹窗
            setIsVisible(false);
            message.success('注册成功！');
            form.resetFields();  // 重置表单字段
        } catch (error) {   
            if (error.payload.message === 'email_already_exists') {
                message.error('该邮箱已存在，请使用其他邮箱');
         
            } else {
                message.error('注册失败，请重试');
            }
        }

    };

    return (
        <div>
            <Button type="link" onClick={showModal}>
                去注册 <ArrowRightOutlined/>
            </Button>

            <Modal
                title="注册"
                visible={isVisible}
                onCancel={handleCancel}
                footer={null}  // 设置为 null，以便自定义按钮
            >
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email' },
                            { type: 'email', message: 'Please enter a valid email!' },
                        ]}
                    >
                        <Input placeholder="email" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' },
                        { max: 20, message: '名字长度不能超过30位!' },
                        ]}
                    >
                        <Input placeholder="name" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' },
                        { min: 6, message: '密码长度至少6位!' },
                        { max: 20, message: '密码长度不能超过20位!' },
                        ]}
                    >
                        <Input.Password placeholder="password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Register;
