import React from 'react';
import { Progress, Button } from 'antd';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { useSelector } from 'react-redux';

const Home = (props) => {
    const router = useRouter();
    const { todoList } = useSelector( state => state.todo )
    
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

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
            
            <Button type="primary" shape="circle" size="large" onClick={()=>router.push('/createplan')}>
                <a><FormOutlined /></a>
            </Button>
        </> 
    )
};

export default Home;