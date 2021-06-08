import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';



const Loading = ({ logOut }) => {
    const antIcon = <LoadingOutlined style={{ fontSize: 45, color: '#7262fd' }} spin />;

    const LoadingView = styled.div`
        margin-left: ${ logOut ? '0' : '150px'};
        color: #7262fd;
        width: ${ logOut ? '100%' : 'none' };
        height: ${ logOut ? '100%' : 0 };
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: ${logOut ? 'white' : 'none'};
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        @media(max-width:767px) {
            margin-left: 0;
            z-index: ${logOut ? '1000' : '0'};
        }
    `;

    return (
        <>
            <LoadingView>
                <Spin indicator={antIcon} />
                <p style={{ marginTop:'15px' }}>잠시만 기다려주세요...</p>
            </LoadingView>
        </>
    );
};

export default Loading;