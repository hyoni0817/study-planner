import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import DdayFilter from '../containers/DdayFilter';
import Dday from '../components/Dday';

import { useSelector, useDispatch } from 'react-redux';

import { LOAD_DDAY_LIST_REQUEST, SEARCH_DDAY_LIST_REQUEST } from '../reducers/dday';

const SpinWrapper = styled.div`
    margin: 20px 0;
    margin-bottom: 20px;
    padding: 15px 50px;
    text-align: center;
    border-radius: 4px;
`;

const SearchDday = styled(Dday)`
    margin-bottom: 20px;
`

const AllDdayList = () => {   
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { DdayList, isLoadingDday, hasMoreDday, isLoadingMoreDday, DdaySearched, useSearch } = useSelector( state => state.dday );
    const [ searchData, setSearchData] = useState({});

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />


    const onScrollDday = useCallback((value) => {
        if(window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            const lastId = DdayList[DdayList.length - 1] && DdayList[DdayList.length - 1].id;
            if(!countRef.current.includes(lastId)) {
                if(hasMoreDday) {    
                    if(useSearch !== 'no') {
                        dispatch({
                            type: SEARCH_DDAY_LIST_REQUEST,
                            data: searchData,
                            lastId,
                        })
                    } else {
                        dispatch({
                            type: LOAD_DDAY_LIST_REQUEST,
                            lastId,
                        });
                    }
                }
                countRef.current.push(lastId);
            }
        }
    }, [hasMoreDday, DdayList.length])

    useEffect(() => {
        dispatch({
            type: LOAD_DDAY_LIST_REQUEST,
        })
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', onScrollDday);

        return () => {
            window.removeEventListener('scroll', onScrollDday);
        }
    }, [hasMoreDday, DdayList.length])
    
    const separateDate = (id, dueDate, list) => {
        const prevDueDate = list[list.findIndex(v => v.id == id) - 1].dueDate || '';

        return prevDueDate == dueDate ? '' : <tr><th colSpan="3">{dueDate}</th></tr>;
    };

    const onResult = (data) => {
        setSearchData(data);
        countRef.current = [];
    }
    
    return (
        <> 
            <h1>D-day 모아 보기</h1>
            <DdayFilter onResult={onResult} />
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
                {isLoadingMoreDday ? <SpinWrapper><Spin indicator={antIcon} /></SpinWrapper> : ''}
            </Spin>
                    
        </>
    )
}

export default AllDdayList;
