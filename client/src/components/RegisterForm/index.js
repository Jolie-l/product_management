import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '@/store/modules/user';


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
        // 发送请求到后端进行注册
        await dispatch(fetchRegister(values))

        // 提交成功后关闭弹窗
        setIsVisible(false);
        form.resetFields();  // 重置表单字段
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                注册
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
