import React from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


const LoadingView = styled.div`
    color: #7262fd;
    width: 100%;
    height: auto;
    text-align: center;
    margin-top: 40vmin;
    display: inline-block;

    @media(max-width:420px) {
        margin-top: 70vmin;
    }
`;

const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 45, color: '#7262fd' }} spin />;

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