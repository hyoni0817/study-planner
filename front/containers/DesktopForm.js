import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import SelectForms from '../components/SelectForms';
import styled from 'styled-components';
import Home from '../pages/index';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const DesktopForm = () => {
    const [ visible, setVisible ] = useState(true);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = (e) => {
        console.log(e);
        setVisible(false);
    };

    const handleCancel = (e) => {
        window.history.back();
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

export default DesktopForm;