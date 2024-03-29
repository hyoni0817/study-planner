import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Drawer, Avatar, Row, Col, Menu, Switch } from 'antd';
import {
  HomeOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';

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
    background-color: #7262fd;
    position: fixed;
    width:100%;
    z-index: 200;

    @media(min-width: 768px) {
        visibility: hidden;
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
    background: #7262fd;
    color: #D3CEFD;
    }

    & li a:hover:not(.active) {
        color: #7262fd;
    }

    & li > span {
        padding: 8px 16px;
    }

    & li > ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width:100%;

    }

    
    & li > ul > li {
        margin: 5px 0;
    }

    & li > ul > li a {
    display: block;
    color: #000;
    padding: 8px 40px;
    text-decoration: none;
    }

    & li > ul > li a.active {
    background: #7262fd;
    color: #D3CEFD;
    }

    & li > ul > li a:hover:not(.active) {
        color: #7262fd;
    }

    & li > ul > li > span {
        padding: 8px 16px;
    }
`;

const SiteName = styled.a`
    font-size: 18px;
    font-weight: 600;
    color: black;

    &: hover {
        color: black;
    }
`

const Logout = styled.div`
    margin-top: 20%;
    text-decoration: underline;
    text-align: center;
`;

const LogoWrapper = styled.div`
    margin-top: 5px;
    width: 150px; 
    height: 26px; 
    display: inline-block;
`;

const reposive = {
    width: '100%',
    height: 'auto'
};

const MobileMenu = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);

    const [visible, setVisible] = useState(false);
    const [ theme, setTheme ] = useState('light');
    
    const showDrawer = () => {
        setVisible(true);
    };
  
    const onClose = () => {
        setVisible(false);
    };

    const onClickLogout = () => {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
    }
    
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
                        <LogoWrapper>
                            <Link href="/home">
                                <a>
                                    <Image src="/img/logo.svg" width={150} height={26} style={reposive} />
                                </a>
                            </Link>
                        </LogoWrapper>
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
                    <Nickname>{ me.nickname }</Nickname>
                    <p>"카르페디엠"</p>
                </Profile>
                <MobileWebMenu>
                    <li>
                        <Link href="/home">
                            <a class={router.pathname == '/home' ? 'active' : ''} onClick={onClose}><HomeOutlined /> 홈</a>
                        </Link>
                        
                    </li>
                    <li>
                        <span><DatabaseOutlined /> 모아 보기</span>
                        <ul>
                            <li>
                                <Link href="/alltodolist">
                                    <a class={router.pathname == '/alltodolist' ? 'active' : ''} onClick={onClose}> 공부 계획</a>
                                </Link>
                            </li>   
                            <li>
                                <Link href="/allDdaylist">
                                    <a class={router.pathname == '/allDdaylist' ? 'active' : ''} onClick={onClose}> D-day</a>
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/analysis">
                                    <a onClick={onClose}><BarChartOutlined /> 주간/월간 분석</a>
                                </Link>
                            </li> */}
                        </ul>
                    </li>
                    <Logout>
                        <a style={{color: '#9a9494'}} onClick={onClickLogout}>로그아웃</a>
                    </Logout>
                </MobileWebMenu>
                {/* <Switch onChange={onChangeTheme} /> 다크 모드 */}
            </Drawer>
        </>
    )
};

export default MobileMenu;