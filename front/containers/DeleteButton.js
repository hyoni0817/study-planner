import React from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

//redux
import { useDispatch } from 'react-redux';
import { DELETE_TODO_REQUEST } from '../reducers/todo';
import { DELETE_DDAY_REQUEST } from '../reducers/dday';

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
            <Button type="primary" onClick={onHandleDelete} style={{backgroundColor: '#F6BD16', color: 'white', border: '1px solid white', borderRadius: '5px', margin: '10px',}}>
                <DeleteOutlined />
            </Button>
        </>
    )
}

export default DeleteButton;