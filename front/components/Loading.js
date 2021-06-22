import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingView = styled.div`
    margin-left: ${ props => props.logOut ? '0' : '150px'};
    color: #7262fd;
    width: ${ props => props.logOut ? '100%' : 'none' };
    height: ${ props => props.logOut ? '100%' : 0 };
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: ${props => props.logOut ? 'white' : 'none'};
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media(max-width:767px) {
        margin-left: 0;
        z-index: ${props => props.logOut ? '1000' : '0'};
    }
`;

const Loading = ({ logOut }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 45, color: '#7262fd' }} spin />;
    
    return (
        <>
            <LoadingView logOut={logOut}>
                <Spin indicator={antIcon} />
                <p style={{ marginTop:'15px' }}>잠시만 기다려주세요...</p>
            </LoadingView>
        </>
    );
};

export default Loading;