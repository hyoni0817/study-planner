import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { Drawer, Avatar, Row, Col, Menu, Switch, Button } from 'antd';
import DesktopLogin from '../../containers/DesktopLogin';
import MobileLoginPortal from '../../components/MobileLoginPortal';
import MobileLogin from '../../containers/MobileLogin';

const MobileHeader = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 14px 16px;
    overflow: hidden;
    background-color: #7262fd;

    @media(max-width: 320px) {
        padding: 10px 12px;
    }
`;

const LoginAndSignUpWrapper = styled.span`
    float: right
`;

const LoginBtn = styled(Button)`
    &&& {
        color: #7262fd;
        background-color: #ffffff;
        border-color: #ffffff;
    } 

    @media(min-width: 768px) {
        margin: 0 8px;
    }

    @media(max-width: 767px) {
        font-size: 13px;
        margin: 0 4px;
    }

    @media(max-width: 320px) {
        font-size: 10px;
        margin: 0 4px;
    }
`;

const SignUpBtn = styled(Button)`
    &&& {
        color: #7262fd;
        background-color: #ffffff;
        border-color: #ffffff;
    }

    @media(min-width: 768px) {
        margin: 0 8px;
    }

    @media(max-width: 767px) {
        font-size: 13px;
        margin: 0 4px;
    }

    @media(max-width: 320px) {
        font-size: 10px;
        margin: 0 4px;
    }
`;

const NavCol = styled(Col)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
`;

const SiteName = styled.a`
    font-size: 18px;
    font-weight: 600;
    color: black;

    &: hover {
        color: black;
    }
`

const LogoWrapper = styled.div`
    margin-top: 5px;
    width: 150px; 
    height: 26px; 
    display: inline-block;

    @media(max-width: 767px) {
        width: 130px;
    }
`;

const reposive = {
    width: '100%',
    height: 'auto'
}

const BeforeLoginMenu = () => {
    const [loginForm, setLoginForm] = useState(false);

    const onHandleOpen = (value) => {
        setLoginForm(value);
    }

    return (
        <>
            <MobileHeader>
                <LogoWrapper>
                    <Link href="/">
                        <a>
                            <Image src="/img/logo.svg" width={150} height={26} style={reposive} />
                        </a>
                    </Link>
                </LogoWrapper>
                <LoginAndSignUpWrapper>
                    <LoginBtn type="primary" size="default" onClick={() => setLoginForm(true)}>
                        로그인
                    </LoginBtn>
                    { loginForm && <DesktopLogin isOpen={onHandleOpen} />}
                    { loginForm && 
                        <MobileLoginPortal selector="#mobile-login">
                            <MobileLogin isOpen={onHandleOpen}/>
                        </MobileLoginPortal>
                    }
                    <SignUpBtn type="primary" size="default">
                        <Link href="/signup"><a>회원 가입</a></Link>
                    </SignUpBtn>
                </LoginAndSignUpWrapper>
                {/* <li>
                    <a onClick={showDrawer}>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </a>
                </li>
                <li style={{width:'100%', textAlign: 'center'}}><a href="#news">Study Planner</a></li> */}
            </MobileHeader>
        </>
    );
};

export default BeforeLoginMenu;