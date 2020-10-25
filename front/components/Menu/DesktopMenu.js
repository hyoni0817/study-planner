import React, { useState } from 'react';
import styled from 'styled-components';
import { Menu, Switch, Avatar } from 'antd';
import {
  HomeOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  AntDesignOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Profile = styled.div`
    text-align: center;
    margin: 50px auto;
`;
const Nickname = styled.p`
    margin-top: 15px; 
    margin-bottom: 30px; 
`;
const PcWebMenu = styled(Menu)`
    width: 256px;
    height: 100vh;
    position: fixed;
`;

const DesktopMenu = ({ children }) => {
    const [ theme, setTheme ] = useState('light');
    
    const onChangeTheme = (value) => {
        value ? setTheme('dark') : setTheme('light');
    }
    
    return (
        <>
            <PcWebMenu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                theme={theme}
            >
                <Profile>
                    <Avatar
                        size={64}
                        icon={<AntDesignOutlined />}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Nickname>닉네임</Nickname>
                    <p>"잘 할거야, 잘 할거 알아"</p>
                </Profile>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                홈
                </Menu.Item>
                <Menu.Item key="2" icon={<DatabaseOutlined />}>
                모아 보기
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                주간/월간 분석
                </Menu.Item>
                <Switch onChange={onChangeTheme} /> 다크 모드
            </PcWebMenu>
        </>
    );
};

export default DesktopMenu;