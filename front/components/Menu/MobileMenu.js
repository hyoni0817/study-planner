import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Drawer, Avatar, Row, Col, Menu, Switch } from 'antd';
import {
  HomeOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';


const { SubMenu } = Menu;

const Profile = styled.div`
    text-align: center;
    margin: 10px auto;
`;
const Nickname = styled.p`
    margin-top: 15px; 
    margin-bottom: 30px; 
`;

const MobileHeader = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;

    @media(min-width: 768px) {
        visibility: hidden;
        position: fixed;
    }
`;

const NavCol = styled(Col)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
`;

const MobileWebMenu = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    width:100%;

    & li {
        margin: 5px 0;
    }

    & li a {
    display: block;
    color: #000;
    padding: 8px 16px;
    text-decoration: none;
    }

    & li a.active {
    background: #FFC6D0;
    color: #FF284E;
    }

    & li a:hover:not(.active) {
        color: #FF284E;
    }
`;

const MobileMenu = () => {
    const [visible, setVisible] = useState(false);
    const [ theme, setTheme ] = useState('light');
    
    const showDrawer = () => {
        setVisible(true);
    };
  
    const onClose = () => {
        setVisible(false);
    };
    
    const onChangeTheme = (value) => {
        value ? setTheme('dark') : setTheme('light');
    }

    return (
        <>
            <MobileHeader>
                <Row>
                    <NavCol span={3}>
                        <a onClick={showDrawer}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </a>
                    </NavCol>
                    <NavCol span={21}>
                        <Link href="/"><a>Study Planner</a></Link>
                    </NavCol>
                </Row>
                {/* <li>
                    <a onClick={showDrawer}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a>
                </li>
                <li style={{width:'100%', textAlign: 'center'}}><a href="#news">Study Planner</a></li> */}
            </MobileHeader>
            <Drawer
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
                key="left"
            >
                <Profile>
                    <Avatar
                        size={64}
                        icon={<AntDesignOutlined />}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Nickname>닉네임</Nickname>
                    <p>"잘 할거야, 잘 할거 알아"</p>
                </Profile>
                <MobileWebMenu>
                    <li>
                        <Link href="/">
                            <a class="active" onClick={onClose}><HomeOutlined /> 홈</a>
                        </Link>
                        
                    </li>
                    <li>
                        <Link href="/allplanlist">
                            <a onClick={onClose}><DatabaseOutlined /> 모아 보기</a>
                        </Link>
                        
                    </li>
                    <li>
                        <Link href="/analysis">
                            <a onClick={onClose}><BarChartOutlined /> 주간/월간 분석</a>
                        </Link>
                        
                    </li>
                </MobileWebMenu>
                <Switch onChange={onChangeTheme} /> 다크 모드
            </Drawer>
        </>
    )
};

export default MobileMenu;