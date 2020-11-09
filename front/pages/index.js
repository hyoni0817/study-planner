import React, { useState } from 'react';
import { Layout, Card, Col, Row, Progress, Button } from 'antd';
import Link from 'next/link';
import TodayList from '../components/TodayList';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';

const Home = () => {
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [ size, setSize ] = useState('large');

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
            <Button type="primary" shape="circle" size={size}>
                <Link href="/createplan"><a><FormOutlined /></a></Link>
            </Button>
        </>
    )
};

export default Home;