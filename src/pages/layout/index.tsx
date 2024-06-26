
import React from 'react'
import { Layout } from 'antd'
import LeftMenu from '../menu';
import { Outlet } from 'react-router-dom'
import Top from '../header';
const { Header,  Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    backgroundColor: '#2392A2'
};

const contentStyle: React.CSSProperties = {
    padding:'18px',
    backgroundColor: '#BEF1EE'
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: '100vh',
    backgroundColor: '#2392A2',
};
console.log('import.meta',import.meta);

export default function BaseLayout() {
    return (
        <>
            <Layout>
                <Sider style={siderStyle}>
                    <div style={headerStyle}>
                        {/* <img width={'100%'} height={'100%'} src={Logo} alt="" /> */}
                        <img width={'100%'} height={'100%'} src={new URL('@/assets/react.svg', import.meta.url).href} alt="" />
                    </div>
                    <LeftMenu />
                </Sider>
                <Layout>
                    <Header style={headerStyle}>
                        <Top/>
                    </Header>
                    <Content style={contentStyle}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout >
        </>
    )
}
