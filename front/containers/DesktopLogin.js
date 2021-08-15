import React, { useState } from 'react';
import { Modal } from 'antd';
import LoginForm from '../containers/LoginForm';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_LOG_IN_ERROR_REASON } from '../reducers/user';

const DesktopLogin = ({isOpen}) => {
    const dispatch = useDispatch();
    const { loginErrorReason } = useSelector(state => state.user);

    const [visible, setVisible] = useState(true);
 
    const onHandleCancel = () => {
        setVisible(false);
        isOpen(false);
        if(loginErrorReason) {
            dispatch({
                type: INITIAL_LOG_IN_ERROR_REASON,
            })
        }

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
                wrapClassName={"desktop-modal"}
            >
                <LoginForm onClose={onHandleCancel}/>
            </Modal>
        </>
    )
}

export default DesktopLogin;