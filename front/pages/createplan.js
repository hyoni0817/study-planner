import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from '../components/MobileFormPortal';
import DesktopForm from '../containers/DesktopForm';
import Loading from '../components/Loading';

//redux
import { useSelector } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';

//ssr
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const CreatePlan = () => {
    const router = useRouter()

    const { me } = useSelector(state => state.user);

    const [pageLoading, setPageLoading] = useState(false);

    useEffect(() => {
      router.prefetch('/home')
    }, [])

    useEffect(() => {
        if(!me) {
            alert('로그인 후 이용해주세요.');
            router.push('/');
        }
    }, [me && me.id])

    useEffect(() => {
        if(!me) {
            const handleStart = () => { setPageLoading(true); };
            const handleComplete = () => { setPageLoading(false); };
            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleComplete);
            router.events.on('routeChangeError', handleComplete);
        }
    }, [router && me]);

    return (
        <>
            { pageLoading ? <><Loading logOut={true} /></> :
                <>
                    <MobileFormPortal selector="#mobile-form">
                        <MobileFormWrapper />
                    </MobileFormPortal>
                    <DesktopForm />
                </>
            }
        </>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
        axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
    });

    context.store.dispatch(END);

    await context.store.sagaTask.toPromise();
});

export default CreatePlan;