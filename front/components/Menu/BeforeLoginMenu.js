import React, { useState } from 'react';
import Link from 'next/link';
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
    background-color: #333;
`;

const LoginAndSignUpWrapper = styled.span`
    float: right
`;

const LoginBtn = styled(Button)`
    margin: 0 8px;
`;

const SignUpBtn = styled(Button)`
    margin: 0 8px;
`;

const NavCol = styled(Col)`
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
`;

const BeforeLoginMenu = () => {
    const [loginForm, setLoginForm] = useState(false);

    const onHandleOpen = (value) => {
        setLoginForm(value);
    }

    return (
        <>
            <MobileHeader>
                <Link href="/"><a>Study Planner</a></Link>
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