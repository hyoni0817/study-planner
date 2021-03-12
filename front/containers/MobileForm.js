import React from 'react';
import { PageHeader } from 'antd';
import styled from 'styled-components';
import SelectForms from '../components/SelectForms';
import TodoForm from './TodoForm';
import DdayForm from './DdayForm';

const PageHeaderWrapper = styled.div`
    background-color: #f5f5f5;
    padding: 24px;       
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow:auto;
    z-index:99;
`;

const MobileForm = ({data, type, mode, isOpen}) => {
    const onHandleClose = () => {
        isOpen(false);
    }

    return (
        <>
            <PageHeaderWrapper>
                <PageHeader
                    ghost={false}
                    onBack={ mode == 'edit' ? onHandleClose : () => window.history.back()}
                    title={ mode == "edit" ? "수정하기" : "작성하기" }
                >
                    {type == 'todo' ? <TodoForm mode="edit" data={data} onSubmit={onHandleClose} /> : type == "Dday" ? <DdayForm mode="edit" data={data} onSubmit={onHandleClose}/> : <SelectForms />}
                </PageHeader>
            </PageHeaderWrapper>
        </>
    );
};


export default MobileForm;