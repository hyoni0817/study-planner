import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Router from 'next/router';
import { Button, Affix, Row, Col, Spin } from 'antd';
import { FormOutlined, LoadingOutlined } from '@ant-design/icons';
import Todo from '../components/Todo';
import Dday from '../components/Dday';
import SelectForms from '../components/SelectForms';
import Loading from '../components/Loading';
import {useRouter} from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

import { LOAD_NOW_TODO_LIST_REQUEST, LOAD_SUBJECT_LIST_REQUEST, LOAD_TODAY_TODO_LIST_REQUEST } from '../reducers/todo';
import { LOAD_VIEWABLE_DDAY_LIST_REQUEST } from '../reducers/dday';
import { LOAD_USER_REQUEST } from '../reducers/user';
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

const TodayTodoListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
    border-spacing: 12px 20px;
`;

const AddTodoAffix = styled(Affix)`
    float: right;
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

const TodayAchivementRateWrapper = styled.div`
    height: 200px;
    display: table;
    width: 100%;
`
const TodayDate = styled.div`
    font-weight: 600;
    font-size: 1.2em;
    @media(max-width: 767px) {
        margin-top: 60px;
    }   
`;

const Title = styled.p`
    margin-top: 20px;
    font-weight: 600;
`

const Home = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { todayTodoList, hasMoreTodo, isLoadingMoreTodo, nowTodoList, isLoadingNowTodo, isLoadingTodayTodo, totalTodo, totalCompletedTodo } = useSelector( state => state.todo )
    const { isLoadingDday, hasMoreDday, isLoadingMoreDday, viewableDdayList } = useSelector( state => state.dday )
    const { me, isLoggedOut } = useSelector(state => state.user);
    const [pageLoading, setPageLoading] = useState(false);

    const date = new Date();
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const todayDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD'); 
    const timeFormat = 'HH:mm'; 
    const nowTime = moment(moment().format(timeFormat), timeFormat);
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#7262fd' }} spin />

    let completionCount = 0;
    let progressValue = 0;

    if(me) {
        completionCount = totalCompletedTodo ? totalCompletedTodo : me.CompletedTodos.length;
        progressValue = totalTodo ? +(completionCount / totalTodo * 100).toFixed(2) : +(completionCount / me.Todos.length * 100).toFixed(2);    
    } 

    let page = 2;
    
    const onScrollTodo = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            const lastId = todayTodoList[todayTodoList.length - 1] && todayTodoList[todayTodoList.length - 1].id;
            if(!countRef.current.includes(lastId)) {
                if(hasMoreTodo) {    
                    dispatch({
                        type: LOAD_TODAY_TODO_LIST_REQUEST,
                        page: page++,
                        lastId,
                    });
                }
                countRef.current.push(lastId);
            }
        }
    }, [hasMoreTodo, todayTodoList.length])

    const onScrollDday = useCallback((value) => {
        if(document.querySelector('.DdayListView').scrollLeft + document.querySelector('.DdayListView').clientWidth > document.querySelector('.DdayListView').scrollWidth - 50) {
            const lastId = viewableDdayList[viewableDdayList.length - 1] && viewableDdayList[viewableDdayList.length - 1].id;
            if(!countRef.current.includes(lastId)) {
                console.log("hasMoreDday:", hasMoreDday);
                if(hasMoreDday) {    
                    dispatch({
                        type: LOAD_VIEWABLE_DDAY_LIST_REQUEST,
                        lastId,
                    });
                }
                countRef.current.push(lastId);
            }
        }
    }, [hasMoreDday, viewableDdayList.length])

    const onClickWriteBtn = () => {
        router.push('/createplan');
    }
    
    useEffect(() => {
        window.addEventListener('scroll', onScrollTodo);
        return () => {
            window.removeEventListener('scroll', onScrollTodo);
        }
        
    }, [hasMoreTodo, todayTodoList.length]);

    useEffect(() => {
        let DdayListView = document.querySelector('.DdayListView');
        DdayListView.addEventListener('scroll', onScrollDday);
        return () => {
            DdayListView.removeEventListener('scroll', onScrollDday);
            DdayListView = null;
        }
        
    }, [hasMoreDday, viewableDdayList.length]);

    useEffect(() => {
        if(!me && !isLoggedOut) {
            alert('로그인 후 이용해주세요.');
            router.push('/');
        } else if(!me && isLoggedOut) {
            router.push('/');
        }
    }, [me && me.id, isLoggedOut]);

    useEffect(()=> {
        if(!me) {
            const handleStart= ()=> { setPageLoading(true); };
            const handleComplete= ()=> { setPageLoading(false); };
            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleComplete);
            router.events.on('routeChangeError', handleComplete);
        }
    }, [router && !me]);

    return (
        <>
            { pageLoading ? <><Loading logOut={true} /></> : 
                <>
                    <TodayDate>{date.getFullYear()}년 {date.getMonth()+1}월 {date.getDate()}일 {days[date.getDay()]}요일</TodayDate>
                    <div className="DdayListView" style={{ padding: isLoadingDday ? '50px 15px 50px 0' : '15px 15px 15px 0', textAlign: 'center', overflowX: 'auto', overflowY: 'none' }}>
                        <Spin indicator={antIcon} spinning={isLoadingDday} tip="D-day 목록을 불러오는 중입니다...">
                            <Row gutter={16} justify="center" style={{ marginRight: '0', }}>
                                { 
                                    viewableDdayList.length == 0 ? <p style={{textAlign: 'center'}}>아직 D-day가 등록되지 않았습니다.</p> 
                                    : viewableDdayList.map((c) => {
                                        console.log("c:", c)
                                        return (
                                            <Col xs={12} sm={6} md={10} lg={6}>
                                                <Dday key={c.id} data={c} view="home"/>    
                                            </Col>
                                        )
                                    })  
                                }   
                                {isLoadingMoreDday ? <SpinWrapper><Spin indicator={antIcon} /></SpinWrapper> : ''}
                            </Row>
                        </Spin>             
                    </div> 
                    <TodayAchivementRateWrapper>
                        <Title>오늘의 성취율</Title>
                        <TodayAchivementRate value={progressValue} />
                    </TodayAchivementRateWrapper>
                    <Title>지금 해야할 일</Title>
                    <TodoNowWrapper>
                        <Spin indicator={antIcon} spinning={isLoadingNowTodo} tip="할 일 목록을 불러오는 중입니다...">
                            {
                                nowTodoList.length == 0 ? <p style={{textAlign: 'center', display: 'tableCell', }}>지금 해야할 일이 없습니다.</p> 
                                : nowTodoList.map((c) => {
                                    return (

                                        <Todo post={c} view="now" />
                                    )
                                })
                            }
                        </Spin> 
                    </TodoNowWrapper>
                    <Title>오늘 해야할 일</Title>
                    <TodayTodoListWrapper>
                        <Spin indicator={antIcon} spinning={isLoadingTodayTodo} tip="할 일 목록을 불러오는 중입니다...">
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
                    </TodayTodoListWrapper>
                    <AddTodoAffix>
                        <Button type="primary" shape="circle" size="large" onClick={onClickWriteBtn} icon={<FormOutlined />} />
                    </AddTodoAffix>
                </>
            }
        </>
    )
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    console.log('getServerSideProps start');
    console.log(context.req.headers);
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
        type: LOAD_TODAY_TODO_LIST_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_VIEWABLE_DDAY_LIST_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_NOW_TODO_LIST_REQUEST,
    });
    context.store.dispatch(END);
    console.log('getServerSideProps end');
    await context.store.sagaTask.toPromise();
});

export default Home;