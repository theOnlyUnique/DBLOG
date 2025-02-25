// TopMenu.tsx
import React, { useState } from 'react';
import { Menu, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
const TopMenu: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const items = [
        
        {
            key: 'find-shit',
            label: '史海淘金',
        },
        {
            key: 'about-project',
            label: '关于项目',
        },
        {
            key: 'about-author',
            label: '关于我',
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
    const route = useNavigate()
    const onClick = (e: { key: string }) => {
        setCurrent(e.key);
        console.log('打印key',e.key)
        route("/" + e.key)
    };

    return (
        <Row>
            <div style={{ display: 'flex',justifyContent: 'space-between',width: '100%'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img style={{height: '50px', width: '50px',marginRight:'10px'}} src="/yctf.jpg" alt="LOGO加载失败了" />
                        
                    <div style={{ zoom: "60%"}}>
                        <p style={{fontSize:'50px',textAlign: 'justify',margin: 0,fontWeight: 'lighter'}}>DBLOG<span style={{display: 'inline-block'}}></span></p>
                        <p style={{fontSize:'20px',textAlign: 'justify',margin: 0,fontWeight: 'bolder'}}>雏草姬的温暖港湾<span style={{display: 'inline-block',width: '100%'}}></span></p>
                    </div>
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