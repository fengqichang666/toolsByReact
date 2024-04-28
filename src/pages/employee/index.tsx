import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space, Table } from 'antd';
import { employeeDisabled, employeeQuery } from '@/api/employee';
import type { TableProps } from 'antd';
import {  useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
}

interface DataType {
    id: number;
    username: string;
    name: string;
    status: number;
    phone: string;
    updateTime: string;
}

const Employee: React.FC = () => {
    const columns: TableProps<DataType>['columns'] = [
        {
            title: '员工姓名',
            dataIndex: 'name'
        },
        {
            title: '账号',
            dataIndex: 'username'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
        },
        {
            title: '账号状态',
            dataIndex: 'status',
            render: (value: number) => {
                if (value === 1) {
                    return '启用';
                } else {
                    return '禁用';
                }
            }
        },
        {
            title: '最后操作时间',
            dataIndex: 'updateTime'
        },
        {
            title: 'Action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => editItem(record)}>修改</Button>
                    <Button type="link"
                            onClick={() => editStatus(record)}>{record.status == 1 ? '禁用' : '启用'}</Button>
                </Space>
            )
        }
    ];

    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [data, setData] = useState<DataType[]>([]);
    const navigate = useNavigate();
    const editItem = async (record: DataType) => {
        navigate(`/layout/employee/add?id=${record.id}`);
    };
    const editStatus = async (record: DataType) => {
        await employeeDisabled({ status: record.status == 1 ? 0 : 1, id: record.id });
        getList(form.getFieldValue('name'));
    };
    const pageChange = (page: number, pageSize: number) => {
        console.log(page, pageSize);
        setPage(page);
        setPageSize(pageSize);
    };
    useEffect(() => {
        getList(form.getFieldValue('name'));
    }, [page, pageSize]);
    const onFinish = (values: FormData) => {
        console.log('Finish:', values);
        getList(values.name);
    };
    const getList = async (name: string) => {
        const res = await employeeQuery({
            page,
            pageSize,
            name
        });
        setData(res.records);
        setTotal(res.total);
    };
    const [form] = Form.useForm();
    return (
        <>
            <Form form={form} name="tableSearch" layout="inline" onFinish={onFinish}>
                <Form.Item
                    label="员工姓名"
                    name="name"
                >
                    <Input />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                >
                    查询
                </Button>
                <Button style={{marginLeft:'auto'}} onClick={()=>{
                    navigate(`/layout/employee/add`)
                }}>添加员工</Button>
            </Form>
            <Table
                style={{ marginTop: '10px', textAlign: 'center' }}
                rowKey="id"
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    onChange: pageChange,
                    total: total
                }}
                columns={columns}
                dataSource={data} />
        </>
    );
};

export default Employee;