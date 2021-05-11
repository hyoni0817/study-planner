import React from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import { CloseOutlined } from '@ant-design/icons';

const LoginFormWrapper = styled.div`
    background-color: white;
    padding: 24px;       
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow:auto;
    z-index:205;
    text-align: center;
`;

const CloseBtn = styled.button`
    background-color: #ffffff00;
    border: none;
    font-size: 20px;
    cursor: pointer;
`

const MobileLogin = ({isOpen}) => {
    const onHandleClose = () => {
        isOpen(false);
    }

    return (
        <>  
            <LoginFormWrapper>
                <div style={{textAlign: 'right'}}>
                    <CloseBtn onClick={onHandleClose}><CloseOutlined /></CloseBtn>
                </div>
                <h1>Study Planner</h1>
                <LoginForm onClose={onHandleClose} />
            </LoginFormWrapper>
        </>
    );
}

export default MobileLogin;