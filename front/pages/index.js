import React, { useState, useEffect } from 'react';
import { Progress, Button, Affix } from 'antd';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOAD_TODO_LIST_REQUEST } from '../reducers/todo';

const TodoNowWrapper = styled.div`
    margin-bottom: 30px;
    display: table;
    width: 100%;
    border-spacing: 12px;
    padding: 20px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: white;
    border-radius: 5px;
`;

const TodoListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    display: table;
    width: 100%;
    border-spacing: 12px 20px;
`;

const AddTodoAffix = styled(Affix)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const Home = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { todoList } = useSelector( state => state.todo )
    const tempTodo = {title: "수학문제 풀기", quantity: 11, unit: "개", important: false, selectSubject: "수학", startTime: "9:00", endTime: "10:00", allDayStatus: false, }
    
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST,
        })
    }, []);
    const onClickWriteBtn = () => {
        router.push('/createplan');
    }
    return (
        <>
            <div>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {days[date.getDay()]}요일</div>
            <Dday />
            <div>
                <p>오늘의 성취율</p>
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#d76d77',
                        '100%': '#3a1c71',
                    }}
                    percent={90}
                />
            </div>
            <SelectForms />
            <p>지금 해야할 일</p>
            <TodoNowWrapper>
                <Todo post={tempTodo}/>
            </TodoNowWrapper>
            <p>오늘 해야할 일</p>
            <TodoListWrapper>
                { 
                    todoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                    : todoList.map((c) => {
                        return (
                            <Todo post={c} />
                        )
                    }) 
                }
            </TodoListWrapper>
            <AddTodoAffix offsetBottom={50}>
                <Button type="primary" shape="circle" size="large" onClick={onClickWriteBtn} icon={<FormOutlined />} />
            </AddTodoAffix>
            
        </> 
    )
};

export default Home;