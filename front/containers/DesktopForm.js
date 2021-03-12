import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import SelectForms from '../components/SelectForms';
import TodoForm from '../containers/TodoForm';
import DdayForm from '../containers/DdayForm';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const DesktopForm = ({mode, type, data, isOpen}) => {
    const router = useRouter();
    const [ editModal, setEditModal ] = useState(true);

    const handleOk = () => {
        setEditModal(false);
        isOpen(false);
      }

    const handleCancel = (e) => {
        if(mode == "edit") {
            setEditModal(false); 
            isOpen(false);
        } else {
            router.push('/');
        }
        console.log(e);
    };

    return (
        <>
            <ModalWrapper
                title={ mode == 'edit' ? "수정하기" : "작성하기"}
                visible={ mode == 'edit' ? editModal: true}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                destroyOnClose={true}
            >
                {type == 'todo' ? <TodoForm mode="edit" data={data} onSubmit={handleOk} /> : type == 'Dday' ? <DdayForm mode="edit" data={data} onSubmit={handleOk} /> : <SelectForms />}
            </ModalWrapper>
        </>
    );
};

export default DesktopForm;