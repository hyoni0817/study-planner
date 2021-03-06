import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from '../components/MobileFormPortal';
import DesktopForm from '../containers/DesktopForm';

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const EditTodoForm = ({data}) => {
    const [ editForm, setEditForm ] = useState(false);

    const onHandleOpen = (value) => {
        setEditForm(value);
    }
    return (
        <>
            <Button type="primary" onClick={() => setEditForm(true)}>
                <EditOutlined />
            </Button>
            { editForm && <DesktopForm mode="edit" type="todo" data={data} isOpen={onHandleOpen} /> }
            { editForm &&  
                <MobileFormPortal selector="#mobile-form">
                    <MobileFormWrapper mode="edit" type="todo" data={data} isOpen={onHandleOpen} />
                </MobileFormPortal> 
            }

        </>
    );
};

export default EditTodoForm;