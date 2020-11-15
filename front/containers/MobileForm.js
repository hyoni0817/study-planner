import React from 'react';
import { PageHeader } from 'antd';
import styled from 'styled-components';
import SelectForms from '../components/SelectForms';

const PageHeaderWrapper = styled.div`
        background-color: #f5f5f5;
        padding: 24px;       
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow:auto;
`;

const MobileForm = () => {
    return (
        <>
            <PageHeaderWrapper>
                <PageHeader
                    ghost={false}
                    onBack={() => window.history.back()}
                    title="작성 하기"
                >
                    <SelectForms />
                </PageHeader>
            </PageHeaderWrapper>
        </>
    );
};


export default MobileForm;