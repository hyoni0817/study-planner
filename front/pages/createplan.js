import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import SelectForms from '../components/SelectForms';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from '../components/MobileFormPortal';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const CreatePlan = ({state}) => {
    const router = useRouter()

    useEffect(() => {
      router.prefetch('/')
    }, [])

    const handleOk = (e) => {
        console.log(e);
    };

    const handleCancel = (e) => {
        router.push('/');
        console.log(e);
    };

    return (
        <>
            <MobileFormPortal selector="#mobile-form">
                <MobileFormWrapper />
            </MobileFormPortal>
            <ModalWrapper
                title="작성 하기"
                visible={true}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <SelectForms />
            </ModalWrapper>
        </>
    );
};

export default CreatePlan;