import React, { ChangeEvent, useState } from 'react'
import { Col, Row, Input, Button } from 'antd';
const { TextArea } = Input;
import { Data } from './index.model'
function Notes() {
    const list: Data[] = [{ ID: crypto.randomUUID(), text: '1', serialNumber: 1 }, { ID: crypto.randomUUID(), text: '2', serialNumber: 2 }]
    const [data, setData] = useState(list)
    const addItem = () => {
        setData([...data, { ID: crypto.randomUUID(), text: '2', serialNumber: data.length + 1 }])
    }
    const delItem = (index: number) => {
        let newData = data.slice();
        newData.splice(index, 1)
        setData(newData)
    }
    const changeItem = (e: ChangeEvent<HTMLTextAreaElement>, i: number) => {
        data[i].text = e.target.value;
        let newData = data.slice();
        setData(newData)
    }
    const getList = () => {
        console.log(data)
    }
    return (
        <>
            <Row className="mt16">
                <Col span={1} offset={12}>
                    <Button onClick={addItem}>添加</Button>
                </Col>
            </Row>
            {
                data.map((item, index) => (
                    <Row key={item.ID} className="mt20">
                        <Col offset={3} span={1} className='tr lh32'>
                            {item.serialNumber}、
                        </Col>
                        <Col span={16}>
                            <TextArea showCount={{ formatter: ({ count }) => `字数:${count}` }} value={item.text} onChange={(e) => changeItem(e, index)}></TextArea>
                        </Col>
                        <Col span={1} className='ml12'>
                            <Button onClick={() => delItem(index)}>删除</Button>
                        </Col>
                    </Row>
                ))
            }

        </>
    )
}

export default Notes