import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { employeeAdd, employeeEdit, employeeInfo } from '@/api/employee';
import { Button, Form, Input, Radio, Space } from 'antd';

interface FormData {
    username: string;
    name: string;
    phone: string;
    sex: string;
    idNumber: string;
}

const AddPage: React.FC = () => {
    const [search] = useSearchParams();
    useEffect(() => {
        if (search.get('id')) {
            getDetails();
        }
    }, [search.get('id')]);
    const getDetails = async () => {
        const res = await employeeInfo(search.get('id') as string);
        form.setFieldsValue({
            username: res.username,
            name: res.name,
            phone: res.phone,
            sex: res.sex,
            idNumber: res.idNumber
        });
    };
    const [form] = Form.useForm();
    const onFinish = async (values: FormData) => {
        if (search.get('id')) {
            await employeeEdit({ id: search.get('id') as string, ...values });
        } else {
            await employeeAdd(values)
        }
        back();
    };
    const back = () => {
        history.go(-1);
    };
    return (<>
        <Button type="link" onClick={back}>
            &lt;返回
        </Button>
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            layout="horizontal"
            initialValues={{ sex: '1' }}
            form={form} name="form" onFinish={onFinish}>
            <Form.Item label="账号" name="username" required={true}>
                <Input />
            </Form.Item>
            <Form.Item label="员工姓名" name="name" required={true}>
                <Input />
            </Form.Item>
            <Form.Item label="手机号" name="phone" required={true}>
                <Input />
            </Form.Item>
            <Form.Item label="性别" name="sex">
                <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="身份证号" name="idNumber" required={true}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 10 }}>
                <Space>
                    <Button type="default" onClick={back}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit">
                        确定
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    </>);
};
export default AddPage;