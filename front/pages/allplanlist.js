import React, { useEffect } from 'react';
import { Tabs, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TodoFilter from '../containers/TodoFilter';
import DdayFilter from '../containers/DdayFilter';
import Todo from '../components/Todo';
import Dday from '../components/Dday';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOAD_TODO_LIST_REQUEST } from '../reducers/todo';
import { LOAD_DDAY_LIST_REQUEST } from '../reducers/dday';

const TodoListWrapper = styled.table`
    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
    border-spacing: 12px 20px;
    border-collapse: initial;
`;

const { TabPane } = Tabs;

const AllPlanList = () => {   
    const dispatch = useDispatch();
    const { todoList, isLoadingTodo, todoSearched, useSearch } = useSelector( state => state.todo );
    const { DdayList, isLoadingDday, DdaySearched } = useSelector( state => state.dday );

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


    useEffect(() => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST,
        })
        dispatch({
            type: LOAD_DDAY_LIST_REQUEST,
        })
    }, []);

    const separateDate = (id, createdAt, list) => {
        const prevCreatedAt = list[list.findIndex(v => v.id == id) - 1].createdAt || '';

        return prevCreatedAt == createdAt ? '' : <tr><th colSpan="3">{createdAt}</th></tr>;
    };

    return (
        <> 
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="공부 계획" key="1">
                    <TodoFilter />
                    <TodoListWrapper>
                        <Spin indicator={antIcon} spinning={useSearch == 'no' ? isLoadingTodo : !todoSearched} tip="할 일 목록을 불러오는 중입니다...">
                            { 
                                todoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                                : todoList.map((c) => {
                                    return (
                                        <>
                                            {todoList.findIndex(v => v.id == c.id) > 0 ? separateDate(c.id, c.createdAt, todoList) : <tr><th colSpan="3">{c.createdAt}</th></tr>}
                                            <Todo key={c.id} post={c} view="search"/>
                                        </>
                                    )
                                }) 
                            }
                        </Spin>
                    </TodoListWrapper>
                    </TabPane>
                    <TabPane tab="D-day" key="2">
                        <DdayFilter />
                        <Spin indicator={antIcon} spinning={useSearch == 'no' ? isLoadingDday : !DdaySearched} tip="D-day 목록을 불러오는 중입니다...">
                            { 
                                DdayList.length == 0 ? <p style={{textAlign: 'center'}}>아직 D-day가 등록되지 않았습니다.</p> 
                                : DdayList.map((c) => {
                                    return (
                                        <>
                                            {DdayList.findIndex(v => v.id == c.id) > 0 ? separateDate(c.id, c.dueDate, DdayList) : <tr><th colSpan="3">{c.dueDate}</th></tr>}
                                            <Dday key={c.id} data={c} view="search" />    
                                        </>
                                    )
                                })  
                            }
                        </Spin>
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default AllPlanList
