import React, { useEffect, useState } from 'react';
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

const CreatePlan = ({ isRefresh }) => {
    const router = useRouter()

    const { me, isLoggedOut } = useSelector(state => state.user);
    
    const [pageLoading, setPageLoading] = useState(false);    

    // const removeBodyOverflow = () => {
    //     document.body.style.overflow = 'hidden';
    // }
    useEffect(() => {
      router.prefetch('/home')
    }, [])

    useEffect(() => {
        if(!me && !isLoggedOut) {
            alert('로그인 후 이용해주세요.');
            setPageLoading(true);
            router.push('/');
        } else if(!me && isLoggedOut) {
            setPageLoading(true);
            router.push('/');
        }
    }, [me && me.id, isLoggedOut]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflowY = 'visible';
        }
    }, []);
    
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
            { !me || pageLoading ? <><Loading logOut={true} /></> :
                <>
                    {/* {me && removeBodyOverflow()} */}
                    <MobileFormPortal selector="#mobile-form">
                        <MobileForm moveHome={isRefresh} />
                    </MobileFormPortal>
                    <DesktopForm moveHome={isRefresh} />
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