import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux';
import { DELETE_TODO_REQUEST } from '../reducers/todo';
import { DELETE_DDAY_REQUEST } from '../reducers/dday';

const DeleteBtn = styled(Button)`
    background-color: ${ props => props.category == `todo` ? `#7262fd` : `white` };
    color: ${ props => props.category == `todo` ? `white` : `#7262fd` };
    border: 1px solid white;
    border-radius: 5px;
    margin: 10px;
`

const DeleteButton = ({id, type}) => {
    const dispatch = useDispatch();

    const onHandleDelete = () => {
        dispatch({
            type: type == "todo" ? DELETE_TODO_REQUEST : DELETE_DDAY_REQUEST,
            data: {
                id: id,
            } 
        })
    }
    return (
        <>
            <DeleteBtn type="primary" onClick={onHandleDelete} category={type}>
                <DeleteOutlined />
            </DeleteBtn>
        </>
    )
}

export default DeleteButton;