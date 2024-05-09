import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalculatorOutlined, UnorderedListOutlined, FormOutlined, CloudUploadOutlined, LinkOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem('员工管理', '/employee', <UnorderedListOutlined />),
	// getItem('商品管理', '/product', <UnorderedListOutlined />),
	{ type: 'divider' },
	getItem('备忘录', '/memorandum', <UnorderedListOutlined />),
	{ type: 'divider' },
	getItem('笔记', '/notes', <FormOutlined />),
	{ type: 'divider' },
	getItem('链接大全', '/linkList', <LinkOutlined />),
	{ type: 'divider' },
	getItem('双11计算器', '/calculator', <CalculatorOutlined />),
	{ type: 'divider' },
	getItem('远程文件', '/remoteFiles', <CloudUploadOutlined />),
	{ type: 'divider' },
	getItem('地图', '/aMap', <CloudUploadOutlined />)
];
const LeftMenu: React.FC = () => {
	const location = useLocation()
	const currentPath = location.pathname.replace('/layout','')
	let navigate = useNavigate();
	const onClick: MenuProps['onClick'] = (e) => {
		navigate(`/layout${e.key}`)
		console.log('click ', currentPath);
	};
	return (
		<Menu
			onClick={onClick}
			style={{
				maxHeight: '100%', backgroundColor: '#2392A2'
			}}
			selectedKeys={[currentPath]}
			defaultOpenKeys={['sub1']}
			mode="inline"
			items={items}
		/>
	);
}
export default LeftMenu