import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Menu, Switch, Avatar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useRouter} from 'next/router';

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
const AddBtnWrapper = styled.div`
    margin:10px 0;
`;

const DesktopMenu = ({ children }) => {
    const router = useRouter();

    const [ theme, setTheme ] = useState('light');
    
    const onChangeTheme = (value) => {
        value ? setTheme('dark') : setTheme('light');
    }

    const onClickWriteBtn = () => {
        router.push('/createplan');
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
                    <Link href="/"><a>홈</a></Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DatabaseOutlined />}>
                    <Link href="/allplanlist"><a>모아 보기</a></Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<BarChartOutlined />}>
                    <Link href="/analysis"><a>주간/월간 분석</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Button 
                        type="primary" 
                        shape="round" 
                        icon={<PlusOutlined />} 
                        size={'large'} 
                        onClick={onClickWriteBtn}
                        style={{width: '100%',}}
                    >
                        계획 / D-day 추가
                    </Button>
                </Menu.Item>
                <AddBtnWrapper>
                </AddBtnWrapper>                
                <Switch onChange={onChangeTheme} /> 다크 모드
            </PcWebMenu>
        </>
    );
};

export default DesktopMenu;
