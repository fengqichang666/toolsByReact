import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Space, Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getBrand } from '@/api/index';

interface DataType {
    key: React.Key,
    ordered: number,
    brandName: string,
    companyName: string,
    description: string,
    id: number,
    status: string,
}

const columns: ColumnsType<DataType> = [
    {
        title: '品牌名称',
        dataIndex: 'brandName',
        align: 'center'
    },
    {
        title: '企业名称',
        dataIndex: 'companyName',
        align: 'center'
    },
    {
        title: '排序',
        dataIndex: 'ordered',
        align: 'center'
    },
    {
        title: '当前状态',
        dataIndex: 'status',
        align: 'center',
        render: (text) => {
            return text == '0' ? '禁用' : '启用';
        }
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right', align: 'center',
        width: 150,
        render: () => {
            return (<Space><Button danger>删除</Button> <Button type="primary">编辑</Button></Space>);
        }
    }
];
// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
};

const Product: React.FC = () => {
    const [data, setData] = useState<DataType[]>([]);
    useEffect(() => {
        getBrand().then((res) => {
            setData(res);
        });
    }, []);
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        console.log('Finish:', values);
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <>
            <Form style={{ marginTop: 30 }} form={form} name="horizontal_login" onFinish={onFinish}>
                <Space>
                    <Form.Item
                        name="nowStatus"
                        label="当前状态"
                    >
                        <Select
                            style={{ width: 200 }}
                            allowClear
                            options={[
                                { value: '1', label: '启用' },
                                { value: '0', label: '禁用' }
                            ]}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="companyName"
                        label="企业名称"
                    >
                        <Input
                        />
                    </Form.Item>
                    <Form.Item
                        name="brandName"
                        label="品牌名称"
                    >
                        <Input
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                >
                                    搜索
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                            </Space>
                        )}
                    </Form.Item>

                </Space>
            </Form>
            <Space>
                <Button danger onClick={onReset}>
                    删除选中
                </Button>
                <Button type="primary" onClick={onReset}>
                    新增
                </Button>
            </Space>
            <Table
                rowKey="id"
                style={{ marginTop: '10px', textAlign: 'center' }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection
                }}
                columns={columns}
                dataSource={data}
            >
            </Table>
        </>
    );
};

export default Product;