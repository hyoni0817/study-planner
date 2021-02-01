import React, { useState } from 'react';
import { Progress, Button, Affix } from 'antd';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Home = (props) => {
    const router = useRouter();
    const { todoList } = useSelector( state => state.todo )
    const [bottom, setBottom] = useState(10);
    
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const onClickWriteBtn = () => { 
        setBottom(bottom + 10);
        router.push('/createplan');
    }
    return (
        <>
            <div>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {days[date.getDay()]}요일</div>
            <Dday />
            오늘의 성취율
            <Progress
                type="circle"
                strokeColor={{
                    '0%': '#d76d77',
                    '100%': '#3a1c71',
                }}
                percent={90}
            />
            <SelectForms />
            { 
                todoList.map((c) => {
                    return (
                        <Todo post={c} />
                    )
                }) 
            }
            
            <Affix offsetBottom={bottom}>
                <Button type="primary" shape="circle" size="large" onClick={onClickWriteBtn} style={{float: 'right'}}>
                    <a><FormOutlined /></a>
                </Button>
            </Affix>
        </> 
    )
};

export default Home;