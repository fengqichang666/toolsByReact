import { ChangeEvent, useState } from 'react'
import { Col, Row, Input, Button } from 'antd';
import { Data } from './index.model'
function Memorandum() {
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
    const changeItem = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        data[i].text = e.target.value;
        let newData = data.slice();
        setData(newData)
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
                    <Row key={item.ID} className="mt16">
                        <Col offset={3} span={1} className='tr lh32'>
                            {item.serialNumber}、
                        </Col>
                        <Col span={16}>
                            <Input value={item.text} onChange={(e) => changeItem(e, index)}></Input>
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

export default Memorandum