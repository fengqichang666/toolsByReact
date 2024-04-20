import React from 'react'
import { Button, Form, type FormProps, Input, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import {login} from '@/api/index';
type FieldType = {
    username?: string;
    password?: string;
};

export default function Login() {
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>["onFinish"] =async (values) => {
        console.log('Success:', values);
        localStorage.setItem('token', '123456')
        await login(values)
        navigate('/layout')
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row>
            <Col span={12} offset={12}>

                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
