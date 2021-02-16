import React from 'react';
import { Modal } from 'antd';
import SelectForms from '../components/SelectForms';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const DesktopForm = () => {
    const router = useRouter();

    const handleOk = (e) => {
        console.log(e);
    };

    const handleCancel = (e) => {
        router.push('/');
        console.log(e);
    };
    return (
        <>
            <ModalWrapper
                title="작성 하기"
                visible={true}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
            >
                <SelectForms />
            </ModalWrapper>
        </>
    );
};

export default DesktopForm;