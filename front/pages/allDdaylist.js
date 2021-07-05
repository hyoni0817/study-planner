import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import DdayFilter from '../containers/DdayFilter';
import Dday from '../components/Dday';
import Loading from '../components/Loading';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_DDAY_LIST_REQUEST, SEARCH_DDAY_LIST_REQUEST } from '../reducers/dday';
import { LOAD_USER_REQUEST } from '../reducers/user';

//ssr
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios'; 

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

const AllDdayTitle = styled.h2`
    font-weight: 600;
    @media(max-width: 767px) {
        margin-top: 60px;
    }
`

const AllDdayList = () => {   
    const router = useRouter();
    const dispatch = useDispatch();
    const countRef = useRef([]);
    const { DdayList, isLoadingDday, hasMoreDday, isLoadingMoreDday, DdaySearched, useSearch } = useSelector( state => state.dday );
    const { me, isLoggedOut, isLoggingOut } = useSelector(state => state.user);
    const [ searchData, setSearchData] = useState({});
    const [ pageLoading, setPageLoading ] = useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 24, color: '#7262fd' }} spin />


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
        window.addEventListener('scroll', onScrollDday);

        return () => {
            window.removeEventListener('scroll', onScrollDday);
            countRef.current = [];
        }
    }, [hasMoreDday, DdayList.length])

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
            { pageLoading ? <><Loading logOut={true} /></> :
                <> 
                    <AllDdayTitle>D-day 모아 보기</AllDdayTitle>
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
            }
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : ''; 
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    })
    context.store.dispatch({
        type: LOAD_DDAY_LIST_REQUEST,
    });

    context.store.dispatch(END);
    
    await context.store.sagaTask.toPromise();
});

export default AllDdayList;
