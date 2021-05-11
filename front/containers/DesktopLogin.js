import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '../containers/LoginForm';

const DesktopLogin = ({isOpen}) => {
    const [visible, setVisible] = useState(true);
 
    const onHandleCancel = () => {
        setVisible(false);
        isOpen(false);
    };

    return (
        <>
            <Modal
                visible={visible}
                footer={null}
                onCancel={onHandleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                width={400}
            >
                <LoginForm onClose={onHandleCancel}/>
            </Modal>
        </>
    )
}

export default DesktopLogin;