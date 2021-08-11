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

const EditBtn = styled(Button)`
    background-color: ${ props => props.category == `todo` ? `#7262fd` : `white` };
    color: ${ props => props.category == `todo` ? `white` : `#7262fd` };
    border: 1px solid white;
    border-radius: 5px;
    margin: 10px 0;
`

const EditFormButton = ({data, type}) => {
    const [ editForm, setEditForm ] = useState(false);

    const onHandleOpen = (value) => {
        setEditForm(value);
    }
    return (
        <>
            <EditBtn type="primary" onClick={() => setEditForm(true)} category={type} >
                <EditOutlined />
            </EditBtn>
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