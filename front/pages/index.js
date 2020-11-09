import React, { useState } from 'react';
import { Progress, Button, Modal } from 'antd';
import TodayList from '../components/TodayList';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ModalWrapper = styled(Modal)`
    @media(max-width: 767px) {
        display: none;
    }   
`;

const Home = (props) => {
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [ size, setSize ] = useState('large');
    const [ visible, setVisible ] = useState(false);

    const showModal = () => {
        window.history.pushState(null, null, '/createplan');
        setVisible(true);
    };

    const handleOk = (e) => {
        window.history.pushState(null, null, '/');
        console.log(e);
        setVisible(false);
    };

    const handleCancel = (e) => {
        window.history.pushState(null, null, '/');
        setVisible(false);
        console.log(e);
    };

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
            <Button type="primary" shape="circle" size={size} onClick={showModal}>
                <a><FormOutlined /></a>
            </Button>
            <ModalWrapper
                title="작성 하기"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <SelectForms />
            </ModalWrapper>
        </>
    )
};

export default Home;