import React from 'react';
import styled from 'styled-components';
import Terms from '../components/Terms';
import { CloseOutlined } from '@ant-design/icons';

const TermsWrapper = styled.div`
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow:auto;
    z-index:205;
`;

const CloseBtn = styled.button`
    background-color: #ffffff00;
    border: none;
    font-size: 20px;
    cursor: pointer;
`;

const TermsHeader = styled.div`
    text-align: right;   
    padding: 24px; 
    margin-bottom: 15px; 
    border-bottom: 1px solid #f0f0f0;
`;

const TermsContents = styled.div`
    padding: 0 24px;
`;

const TermsTitle = styled.span`
    float: left; 
    font-weight: 600; 
    font-size: 20px;
`;

const MobileTerms = ({isOpen}) => {
    const onHandleClose = () => {
        isOpen(false);
    }

    return (
        <>
            <TermsWrapper>
                <TermsHeader>
                    <TermsTitle>개인정보 처리 방침</TermsTitle>
                    <CloseBtn onClick={onHandleClose}><CloseOutlined /></CloseBtn>
                </TermsHeader>
                <TermsContents>
                    <Terms />
                </TermsContents>
            </TermsWrapper>
        </>
    );
};

export default MobileTerms;