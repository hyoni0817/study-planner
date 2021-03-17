import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Affix, Row, Col, Spin } from 'antd';
import { FormOutlined, LoadingOutlined } from '@ant-design/icons';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';

import { LOAD_TODAY_TODO_LIST_REQUEST } from '../reducers/todo';
import { LOAD_DDAY_LIST_REQUEST } from '../reducers/dday';
import TodayAchivementRate from '../components/TodayAchivementRate';

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

const SpinWrapper = styled.div`
    margin: 20px 0;
    margin-bottom: 20px;
    padding: 15px 50px;
    text-align: center;
    border-radius: 4px;
`;

const Home = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { todayTodoList, isLoadingTodo, hasMoreTodo, isLoadingMoreTodo } = useSelector( state => state.todo )
    const { DdayList, isLoadingDday } = useSelector( state => state.dday )

    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
    const timeFormat = 'HH:mm'; 
    const nowTime = moment(moment().format(timeFormat), timeFormat);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

    const nowTodoList = todayTodoList.filter( v => 
        nowTime.isSameOrAfter(moment(v.startTime, timeFormat)) && nowTime.isSameOrBefore(moment(v.endTime, timeFormat)) || v.allDayStatus);
    const showDdayList = DdayList.filter( v => v.viewState);
    const completionCount = todayTodoList.filter(v => v.completion == true).length;
    const progressValue = +(completionCount / todayTodoList.length * 100).toFixed(2);
    
    const onScrollTodo = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            const lastId = todayTodoList[todayTodoList.length - 1] && todayTodoList[todayTodoList.length - 1].id;
            if(!countRef.current.includes(lastId)) {
                if(hasMoreTodo) {    
                    dispatch({
                        type: LOAD_TODAY_TODO_LIST_REQUEST,
                        lastId,
                    });
                }
                countRef.current.push(lastId);
            }
        }
    }, [hasMoreTodo, todayTodoList.length])

    useEffect(() =>{
        dispatch({
            type: LOAD_TODAY_TODO_LIST_REQUEST,
        });
        dispatch({
            type: LOAD_DDAY_LIST_REQUEST,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScrollTodo);
        return () => {
            window.removeEventListener('scroll', onScrollTodo);
        }
        
    }, [hasMoreTodo, todayTodoList.length]);

    const onClickWriteBtn = () => {
        router.push('/createplan');
    }

    return (
        <>
            <div>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {days[date.getDay()]}요일</div>
            <div style={{ padding: '15px 15px 15px 0', textAlign: 'center', overflowX: 'auto', }}>
                <Spin indicator={antIcon} spinning={isLoadingDday} tip="D-day 목록을 불러오는 중입니다...">
                    <Row gutter={16} justify="center" style={{ marginRight: '0', }}>
                        { 
                            showDdayList.length == 0 && !isLoadingDday ? <p style={{textAlign: 'center'}}>아직 D-day가 등록되지 않았습니다.</p> 
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
                </Spin>             
            </div> 
            <div>
                <p>오늘의 성취율</p>
                <TodayAchivementRate value={progressValue} />
            </div>
            <SelectForms />
            <p>지금 해야할 일</p>
            <TodoNowWrapper>
                <Spin indicator={antIcon} spinning={isLoadingTodo} tip="할 일 목록을 불러오는 중입니다...">
                    {
                        nowTodoList.length == 0 ? <p style={{textAlign: 'center', display: 'tableCell', }}>지금 해야할 일이 없습니다.</p> 
                        : nowTodoList.map((c) => {
                            return (

                                <Todo post={c} />
                            )
                        })
                    }
                </Spin> 
            </TodoNowWrapper>
            <p>오늘 해야할 일</p>
            <TodoListWrapper>
            <Spin indicator={antIcon} spinning={isLoadingTodo} tip="할 일 목록을 불러오는 중입니다...">
                { 
                    todayTodoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                    : 
                            todayTodoList.map((c) => {
                                return (
                                    <Todo key={c.id} post={c} />
                                )
                            }) 
                        
                }
                {isLoadingMoreTodo ? <SpinWrapper><Spin indicator={antIcon} /></SpinWrapper> : ''}
            </Spin>
            </TodoListWrapper>
            <AddTodoAffix offsetBottom={50}>
                <Button type="primary" shape="circle" size="large" onClick={onClickWriteBtn} icon={<FormOutlined />} />
            </AddTodoAffix>
            
        </> 
    )
};

export default Home;