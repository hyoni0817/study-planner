import React, {useEffect, useState} from 'react';
import { Modal } from 'antd';
import SelectForms from '../components/SelectForms';
import TodoForm from '../containers/TodoForm';
import DdayForm from '../containers/DdayForm';

import { useRouter } from 'next/router';

const DesktopForm = ({mode, type, data, isOpen, moveHome}) => {
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
            moveHome ? router.push('/home') : router.back();
        }
    };

    return (
        <>
            <Modal
                title={ mode == 'edit' ? "수정하기" : "작성하기"}
                visible={ mode == 'edit' ? editModal: true}
                centered
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
                wrapClassName={"desktop-modal"}
            >
                {type == 'todo' ? <TodoForm mode="edit" data={data} onSubmit={handleOk} /> : type == 'Dday' ? <DdayForm mode="edit" data={data} onSubmit={handleOk} /> : <SelectForms />}
            </Modal>
        </>
    );
};

export default DesktopForm;