import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import {useRouter} from 'next/router';
import DesktopMenu from './Menu/DesktopMenu';
import MobileMenu from './Menu/MobileMenu';
import Welcome from '../pages/index';
import Home from '../pages/home';
import CreatePlan from '../pages/createplan';
import BeforeLoginMenu from './Menu/BeforeLoginMenu';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_USER_REQUEST } from '../reducers/user';

const { Header, Content, Footer, Sider } = Layout;

const DesktopSider = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;

    @media(max-width: 767px) {
        visibility: hidden;
    }
`;

const AfterLoginSiteLayout = styled(Layout)`
    margin-Left: 256px;

    @media(max-width: 767px) {
        margin-left: 0px;
    }
`;

const BeforeLoginSiteLayout = styled(Layout)`
    height: 100%;
    width: auto;
`;

const LayoutContent = styled.div`
    margin: 20px 10px;
`

const SiteContent = styled(Content)`
    padding: 24px 16px 40px 16px;
    // height: 100%;
    // overflow-x: initial;
`
const AppLayout = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);

    useEffect(() => {
        if(!me) {
            dispatch({
                type: LOAD_USER_REQUEST,
            });
        }
    }, []);

    console.log("children:", children);
    return (
        <>
            { !me ? 
                <>
                    <Layout>
                        <BeforeLoginMenu />
                        {/* <BeforeLoginSiteLayout>
                            <SiteContent>
                                <Welcome />
                            </SiteContent>
                        </BeforeLoginSiteLayout> */}
                        <LayoutContent>
                            {children}
                        </LayoutContent>
                    </Layout>
                </>                  
            :   <>
                    <MobileMenu />
                    <Layout>
                        <DesktopSider>
                            <DesktopMenu />
                        </DesktopSider>
                        <AfterLoginSiteLayout>
                            <SiteContent>
                                { children.type === Home || children.type === CreatePlan ? <Home /> : children }
                            </SiteContent>
                        </AfterLoginSiteLayout>
                    </Layout>
                </>
            }
            {children.type === CreatePlan && children}
        </>
    );
};

export default AppLayout;
