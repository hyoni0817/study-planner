import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout, Breadcrumb } from 'antd';
import DesktopMenu from './Menu/DesktopMenu';
import MobileMenu from './Menu/MobileMenu';

const { Header, Content, Footer, Sider } = Layout;

const DesktopSider = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;

    @media(max-width: 768px) {
        visibility: hidden;
    }
`;

const SiteLayout = styled(Layout)`
    margin-Left: 256px;

    @media(max-width: 768px) {
        margin-left: 0px;
    }
`;
const AppLayout = ({ children }) => {

    return (
        <>
            <MobileMenu />
            <Layout>
                <DesktopSider>
                    <DesktopMenu />
                </DesktopSider>
                <SiteLayout>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        content
                        </div>
                    </Content>
                </SiteLayout>
            </Layout>
        </>
    );
};

export default AppLayout;
