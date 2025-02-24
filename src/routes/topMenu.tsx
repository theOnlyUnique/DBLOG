// TopMenu.tsx
import React, { useState } from 'react';
import { Menu, Row } from 'antd';

const TopMenu: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const items = [
        {
            key: 'about-author',
            label: '关于我',
        },
        {
            key: 'about-project',
            label: '关于项目',
        },
        {
            key: 'concat-me',
            label: '联系作者',
        },
        {
            key: 'home',
            label: '主页',
        },
    ];

    const onClick = (e: { key: string }) => {
        setCurrent(e.key);
        // console.log('打印key',e.key)
    };

    return (
        <Row>
            <div style={{ display: 'flex',justifyContent: 'space-between',width: '100%'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    {/* <img style={{height: '50px', width: '50px'}} src="/DBlog.png" alt="LOGO加载失败了" /> */}
                    <p style={{fontSize: '50px', lineHeight: '50px', margin: 0}}>DBLOG</p>
                </div>
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                    disabledOverflow
                />
            </div>
        </Row>
    );
};

export default TopMenu;