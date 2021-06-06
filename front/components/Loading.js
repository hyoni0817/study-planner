import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const LoadingView = styled.div`
    width: '100%',
    height: 'auto',
`;

const Loading = () => {
    return (
        <>
            <LoadingView>
                <LoadingOutlined style={{ fontSize: 24 }} spin />
            </LoadingView>
        </>
    );
};

export default Loading;