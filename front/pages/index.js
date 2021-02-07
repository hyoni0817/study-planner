import React, { useState } from 'react';
import { Progress, Button, Affix } from 'antd';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TodoNowWrapper = styled.div`
    margin-bottom: 30px;
`;

const TodoListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 30px
`;

const Home = (props) => {
    const router = useRouter();
    const { todoList } = useSelector( state => state.todo )
    const tempTodo = {title: "수학문제 풀기", quantity: 11, unit: "개", important: false, selectSubject: "수학"}
    
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

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
            <TodoNowWrapper>
                <p>지금 해야할 일</p>
                <Todo post={tempTodo}/>
            </TodoNowWrapper>
            <TodoListWrapper>
                <p>오늘 해야할 일</p>
                { 
                    todoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                    : todoList.map((c) => {
                        return (
                            <Todo post={c} />
                        )
                    }) 
                }
            </TodoListWrapper>
            <Affix offsetBottom={50}>
                <Button type="primary" shape="circle" size="large" onClick={onClickWriteBtn} style={{float: 'right'}}>
                    <a><FormOutlined /></a>
                </Button>
            </Affix>
            
        </> 
    )
};

export default Home;