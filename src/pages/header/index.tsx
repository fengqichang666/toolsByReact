import { Button, Col, Input, Row, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteToken } from '@/store/features/user.ts';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;
const selectBefore = (
    <Select defaultValue="http://">
        <Option value="http://">必应</Option>
        <Option value="https://">谷歌</Option>
    </Select>
);
export default function index() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(deleteToken());
        navigate('/login');
    };
    const onSearch = (val: string) => {
        console.log(val);
    };
    return (
        <div>
            <Row justify="center" align="middle">
                <Col span={12} offset={6}>
                    <Search style={{ verticalAlign: 'middle' }} onSearch={onSearch} addonBefore={selectBefore}
                            enterButton />
                </Col>
                <Col span={2} offset={4}>
                    <Button type="link" onClick={logout}>退出</Button>
                </Col>
            </Row>
        </div>
    );
}
