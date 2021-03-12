import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { DELETE_TODO_REQUEST } from '../reducers/todo';

//redux
import { useDispatch } from 'react-redux';

const DeleteButton = ({id, type}) => {
    const dispatch = useDispatch();

    const onHandleDelete = () => {
        if(type == 'todo') {
            dispatch({
                type: DELETE_TODO_REQUEST,
                data: {
                    id: id,
                } 
            })
        }
    }
    return (
        <>
            <Button type="primary" onClick={onHandleDelete}>
                <DeleteOutlined />
            </Button>
        </>
    )
}

export default DeleteButton;