import React, { useState } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from './MobileFormPortal';
import DesktopForm from '../containers/DesktopForm';

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const EditFormButton = ({data, type}) => {
    const [ editForm, setEditForm ] = useState(false);

    const onHandleOpen = (value) => {
        setEditForm(value);
    }
    return (
        <>
            <Button type="primary" onClick={() => setEditForm(true)} style={{backgroundColor: '#F6BD16', color: 'white', border: '1px solid white', borderRadius: '5px', margin: '10px 0',}} >
                <EditOutlined />
            </Button>
            { editForm && <DesktopForm mode="edit" type={type} data={data} isOpen={onHandleOpen} /> }
            { editForm &&  
                <MobileFormPortal selector="#mobile-form">
                    <MobileFormWrapper mode="edit" type={type} data={data} isOpen={onHandleOpen} />
                </MobileFormPortal> 
            }

        </>
    );
};

export default EditFormButton;