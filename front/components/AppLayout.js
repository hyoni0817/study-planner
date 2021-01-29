import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import DesktopMenu from './Menu/DesktopMenu';
import MobileMenu from './Menu/MobileMenu';
import Home from '../pages/index';
import CreatePlan from '../pages/createplan';

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

const SiteLayout = styled(Layout)`
    margin-Left: 256px;
    border-left: solid;
    border-color: #f1f1f1;
    border-width: 6px;

    @media(max-width: 767px) {
        margin-left: 0px;
    }
`;

const SiteContent = styled(Content)`
    padding: 24px 16px 0;
    over-flow: initial;
    border-left: 1px solid #dbdbdb;
`
const AppLayout = ({ children }) => {
    return (
        <>
            <MobileMenu />
            <Layout>
                <DesktopSider>
                    <DesktopMenu />
                </DesktopSider>
                <SiteLayout>
                    <SiteContent>
                        { children.type === Home || children.type === CreatePlan ? <Home /> : children }
                    </SiteContent>
                </SiteLayout>
            </Layout>
            {children.type === CreatePlan && children}
        </>
    );
};

export default AppLayout;
