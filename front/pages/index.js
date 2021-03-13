import React, { useState, useEffect } from 'react';
import { Progress, Button, Affix, Row, Col } from 'antd';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import { FormOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { LOAD_TODO_LIST_REQUEST } from '../reducers/todo';
import { LOAD_DDAY_LIST_REQUEST } from '../reducers/dday';

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
    const { DdayList } = useSelector( state => state.dday )

    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
    const timeFormat = 'HH:mm'; 
    const nowTime = moment(moment().format(timeFormat), timeFormat);
    const todayTodoList = todoList.filter(v => todayDate.isSame(moment(v.createdAt, 'YYYY-MM-DD')));
    const nowTodoList = todayTodoList.filter( v => 
        nowTime.isSameOrAfter(moment(v.startTime, timeFormat)) && nowTime.isSameOrBefore(moment(v.endTime, timeFormat)) || v.allDayStatus);
    const showDdayList = DdayList.filter( v => v.viewState);

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST,
        });
        dispatch({
            type: LOAD_DDAY_LIST_REQUEST,
        });
    }, []);
    const onClickWriteBtn = () => {
        router.push('/createplan');
    }
    return (
        <>
            <div>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {days[date.getDay()]}요일</div>
            <div style={{ padding: '15px 15px 15px 0', textAlign: 'center', overflowX: 'auto', }}>
                <Row gutter={16} justify="center" style={{ marginRight: '0', }}>
                    { 
                        showDdayList.length == 0 ? <p style={{textAlign: 'center'}}>아직 D-day가 등록되지 않았습니다.</p> 
                        : showDdayList.map((c) => {
                            console.log("c:", c)
                            return (
                                <Col xs={12} sm={6} md={10} lg={6}>
                                    <Dday key={c.id} data={c} />    
                                </Col>
                            )
                        })  
                    }                    
                </Row>
            </div> 
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
                {
                    nowTodoList.length == 0 ? <p style={{textAlign: 'center', display: 'tableCell', }}>지금 해야할 일이 없습니다.</p> 
                    : nowTodoList.map((c) => {
                        return (

                            <Todo post={c} />
                        )
                    })
                }
            </TodoNowWrapper>
            <p>오늘 해야할 일</p>
            <TodoListWrapper>
                { 
                    todayTodoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                    : todayTodoList.map((c) => {
                        return (
                            <Todo key={c.id} post={c} />
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