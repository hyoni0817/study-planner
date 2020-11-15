import React from 'react';
import { Progress, Button } from 'antd';
import TodayList from '../components/TodayList';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';

const Home = (props) => {
    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const [ size, setSize ] = useState('large');
    const [ visible, setVisible ] = useState(false);

    const showModal = () => {
        window.history.pushState(null, null, '/createplan');
        setVisible(true);
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
        </> 
    )
};

export default Home;