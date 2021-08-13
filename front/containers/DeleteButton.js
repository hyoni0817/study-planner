import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
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
    const { confirm } = Modal;

    const showDeleteConfirm = () => {
        confirm({
            title: '삭제하시겠습니까?',
            icon: <ExclamationCircleOutlined />,
            content: `삭제한 ${type == "todo" ? '계획은' : 'D-day는'} 복구하실 수 없습니다.`,
            okText: '네',
            okType: 'danger',
            cancelText: '아니요',
            onOk() {
                dispatch({
                    type: type == "todo" ? DELETE_TODO_REQUEST : DELETE_DDAY_REQUEST,
                    data: {
                        id: id,
                    } 
                })
            }
        });
    };

    return (
        <>
            <DeleteBtn type="primary" onClick={showDeleteConfirm} category={type}>
                <DeleteOutlined />
            </DeleteBtn>
        </>
    )
}

export default DeleteButton;