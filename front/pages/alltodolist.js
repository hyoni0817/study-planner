import React, {useState, useRef, useCallback, useEffect} from 'react';
import Router from 'next/router';
import { Tabs, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import TodoFilter from '../containers/TodoFilter';
import Todo from '../components/Todo';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { LOAD_TODO_LIST_REQUEST, SEARCH_TODO_LIST_REQUEST } from '../reducers/todo';


const TodoListWrapper = styled.table`
    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
    border-spacing: 12px 20px;
    border-collapse: initial;
`;

const SpinWrapper = styled.div`
    margin: 20px 0;
    margin-bottom: 20px;
    padding: 15px 50px;
    text-align: center;
    border-radius: 4px;
`;

const AllTodoTitle = styled.h2`
    font-weight: 600;
    @media(max-width: 767px) {
        margin-top: 60px;
    }
`

const AllTodoList = () => {
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const [ searchData, setSearchData ] = useState({});

    const { todoList, isLoadingTodo, hasMoreTodo, isLoadingMoreTodo, todoSearched, useSearch, } = useSelector( state => state.todo );
    const { me } = useSelector(state => state.user);
    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#7262fd' }} spin />

    const onScrollTodo = useCallback(() => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            const lastId = todoList[todoList.length - 1] && todoList[todoList.length - 1].id;
            if(!countRef.current.includes(lastId)) {
                if(hasMoreTodo) {    
                    if(useSearch !== 'no') {
                        dispatch({
                            type: SEARCH_TODO_LIST_REQUEST,
                            data: searchData,
                            lastId,
                        })
                    } else {
                        dispatch({
                            type: LOAD_TODO_LIST_REQUEST,
                            lastId,
                        });
                    }
                }
                countRef.current.push(lastId);
            }
        }
    }, [hasMoreTodo, todoList.length])

    useEffect(() => {
        dispatch({
            type: LOAD_TODO_LIST_REQUEST,
        })
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', onScrollTodo);

        return () => {
            window.removeEventListener('scroll', onScrollTodo);
        }
    }, [hasMoreTodo, todoList.length]);

    useEffect(() => {
        if(!me) {
            alert('로그인 후 이용해주세요.');
            Router.push('/');
        }
    }, [me && me.id])

    const separateDate = (id, createdAt, list) => {
        const prevCreatedAt = list[list.findIndex(v => v.id == id) - 1].createdAt || '';

        return prevCreatedAt == createdAt ? '' : <tr><th colSpan="3">{createdAt}</th></tr>;
    };
    
    const onResult = (data) => {
        setSearchData(data);
        countRef.current = [];
    }
    
    return (
        <>
            <AllTodoTitle>공부 계획 모아 보기</AllTodoTitle>
            <TodoFilter onResult={onResult} />
            <TodoListWrapper>
                <Spin indicator={antIcon} spinning={isLoadingTodo} tip="할 일 목록을 불러오는 중입니다...">
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
                    {isLoadingMoreTodo ? <SpinWrapper><Spin indicator={antIcon} /></SpinWrapper> : ''}
                </Spin>
            </TodoListWrapper>
        </>
    )
};

export default AllTodoList;