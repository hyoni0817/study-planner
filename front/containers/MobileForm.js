import React from 'react';
import { PageHeader, Descriptions } from 'antd';
import styled from 'styled-components';
import SelectForms from '../components/SelectForms';

const PageHeaderWrapper = styled.div`
        background-color: #f5f5f5;
        padding: 24px;

        @media(min-width: 768px) {
            display: none;
        }   
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