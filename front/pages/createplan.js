import React, { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from '../components/MobileFormPortal';
import DesktopForm from '../containers/DesktopForm';

//redux
import { useSelector } from 'react-redux';

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const CreatePlan = () => {
    const router = useRouter()

    const { me } = useSelector(state => state.user);

    useEffect(() => {
      router.prefetch('/home')
    }, [])

    useEffect(() => {
        if(!me) {
            alert('로그인 후 이용해주세요.');
            Router.push('/');
        }
    }, [me && me.id])

    return (
        <>
            <MobileFormPortal selector="#mobile-form">
                <MobileFormWrapper />
            </MobileFormPortal>
            <DesktopForm />
        </>
    );
};

export default CreatePlan;