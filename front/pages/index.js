import React, { useEffect, useState } from 'react';
import { Carousel, Button } from 'antd';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { LOAD_USER_REQUEST } from '../reducers/user';

//SSR
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import axios from 'axios';

const CarouselContent = styled.h3`
    color: black;
    line-height: 30px;
    text-align: center;
`  ;

const SignUpBtn = styled(Button)`
    &&& {
        margin: 0 8px;
        background-color: #ffffff;
        border-color: #7262fd;
        color: #7262fd;
    }

    &&&: hover {
        margin: 0 8px;
        background-color: #7262fd;
        border-color: #7262fd;
        color: #ffffff;
    }
`;

const reponsive = {

    width: '100%',
    height: 'auto',
    
}

const Welcome = () => {
    // useEffect(() => {
    //     const {pathname} = Router
    //     if(pathname == '/' ){
    //         Router.push('/home')
    //     }
    // });
    const router = useRouter();
    const { me, isLoggedIn } = useSelector(state => state.user);
    const [ pageLoading, setPageLoading ] = useState(false);

    useEffect(() => {
        if(me && isLoggedIn) {
            router.push('/home');
        }
    }, [me && me.id && isLoggedIn]);

    useEffect(()=> {
        if(me) {
            const handleStart= ()=> { setPageLoading(true); };
            const handleComplete= ()=> { setPageLoading(false); };
            router.events.on('routeChangeStart', handleStart);
            router.events.on('routeChangeComplete', handleComplete);
            router.events.on('routeChangeError', handleComplete);
        }
    }, [router && me]);

    return (
        <>
            { pageLoading ? <><Loading logOut={false}/></> : 
                <>
                    <Carousel autoplay>
                        <div>
                            <CarouselContent>
                                D-day와 <br/>
                                오늘의 공부 계획을<br />
                                한 눈에 확인할 수 있어요<br />
                                <Image
                                    src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/StudyPlanner/main/confirm.svg"
                                    alt="Picture of the author"
                                    width={300}
                                    height={300}
                                    style={reponsive}
                                />
                            </CarouselContent>
                        </div>
                        <div>
                            <CarouselContent>
                                오늘 얼마나<br />
                                공부 계획을 완료했는지도<br />
                                알 수 있어요<br />
                                <Image
                                    src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/StudyPlanner/main/achivement.svg"
                                    alt="Picture of the author"
                                    width={300}
                                    height={300}
                                />
                            </CarouselContent>
                        </div>
                        <div>
                            <CarouselContent>
                                Study-Planner가<br />
                                더 효율적으로 공부할 수 있게<br />
                                도와드려요<br />
                                <Image
                                    src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/StudyPlanner/main/join.svg"
                                    alt="Picture of the author"
                                    width={300}
                                    height={300}
                                />
                            </CarouselContent>
                        </div>
                    </Carousel>
                    <div style={{textAlign: 'center'}}>
                        <SignUpBtn type="primary" size="default">
                            <Link href="/signup"><a>회원 가입</a></Link>
                        </SignUpBtn>
                    </div>
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
})

export default Welcome;