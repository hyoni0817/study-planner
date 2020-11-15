import React from 'react';
import { Progress, Button } from 'antd';
import TodayList from '../components/TodayList';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';

const Home = (props) => {
    const router = useRouter();
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    return (
        <>
            <div>{date.getFullYear()}년 {date.getMonth()}월 {date.getDate()}일 {days[date.getDay()]}요일</div>
            <Dday />
            오늘의 성취율
            <Progress
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
                percent={99.9}
                status="active"
            />
            <SelectForms />
            <TodayList />
            <Button type="primary" shape="circle" size="large" onClick={()=>router.push('/createplan')}>
                <a><FormOutlined /></a>
            </Button>
        </> 
    )
};

export default Home;