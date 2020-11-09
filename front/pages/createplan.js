import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import SelectForms from '../components/SelectForms';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const CreatePlan = ({state}) => {
    const router = useRouter()
    const [ visible, setVisible ] = useState(true);

    useEffect(() => {
      router.prefetch('/')
    }, [])

    const handleOk = (e) => {
        console.log(e);
    };

    const handleCancel = (e) => {
        window.history.pushState(null, null, '/');
        setVisible(false);
        console.log(e);
    };

    return (
        <>
            <ModalWrapper
                title="작성 하기"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <SelectForms />
            </ModalWrapper>

        </>
    );
};

export default CreatePlan;