import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import MobileForm from '../containers/MobileForm';
import MobileFormPortal from '../components/MobileFormPortal';
import DesktopForm from '../containers/DesktopForm';

const MobileFormWrapper = styled(MobileForm)`
    @media(min-width: 768px) {
        display: none;
    }
`;

const CreatePlan = () => {
    const router = useRouter()

    useEffect(() => {
      router.prefetch('/')
    }, [])

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