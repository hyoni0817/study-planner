import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import TodoFilter from '../containers/TodoFilter';
import DdayFilter from '../containers/DdayFilter';
import Todo from '../components/Todo';
import Dday from '../components/Dday';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOAD_TODO_LIST_REQUEST } from '../reducers/todo';
import { LOAD_DDAY_LIST_REQUEST } from '../reducers/dday';

const TodoListWrapper = styled.div`
    margin-top: 20px;
    margin-bottom: 30px;
    display: table;
    width: 100%;
    border-spacing: 12px 20px;
`;

const { TabPane } = Tabs;

const AllPlanList = () => {   
    const dispatch = useDispatch();

    const { todoList } = useSelector( state => state.todo );
    const { DdayList } = useSelector( state => state.dday )

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST,
        })
        dispatch({
            type: LOAD_DDAY_LIST_REQUEST,
        })
    }, []);

    return (
        <> 
            <div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="공부 계획" key="1">
                    <TodoFilter />
                    <TodoListWrapper>
                        { 
                            todoList.length == 0 ? <p style={{textAlign: 'center'}}>아직 할 일이 등록되지 않았습니다.</p> 
                            : todoList.map((c) => {
                                return (
                                    <Todo key={c.id} post={c} />
                                )
                            }) 
                        }
                    </TodoListWrapper>
                    </TabPane>
                    <TabPane tab="D-day" key="2">
                        <DdayFilter />
                        { 
                            DdayList.length == 0 ? <p style={{textAlign: 'center'}}>아직 D-day가 등록되지 않았습니다.</p> 
                            : DdayList.map((c) => {
                                return (
                                    <Dday key={c.id} data={c} />    
                                )
                            })  
                        }
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default AllPlanList
