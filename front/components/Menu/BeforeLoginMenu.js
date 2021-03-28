import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Drawer, Avatar, Row, Col, Menu, Switch, Button } from 'antd';

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
    return (
        <>
            <MobileHeader>
                <Link href="/"><a>Study Planner</a></Link>
                <LoginAndSignUpWrapper>
                    <LoginBtn type="primary" size="default">
                        <Link href="/login"><a>로그인</a></Link>
                    </LoginBtn>
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