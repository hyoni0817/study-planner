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

//redux
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT_REQUEST } from '../../reducers/user';

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
    padding:0 24px;
`;
const Logout = styled.div`
    margin-top: 100%;
    text-decoration: underline;
    text-align: center;
`

const DesktopMenu = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);

    const [ theme, setTheme ] = useState('light');
    
    const onChangeTheme = (value) => {
        value ? setTheme('dark') : setTheme('light');
    }

    const onClickWriteBtn = () => {
        router.push('/createplan');
    }

    const onClickLogout = () => {
        dispatch({
            type: LOG_OUT_REQUEST,
        });
    };
    
    return (
        <>
            <PcWebMenu
                mode="inline"
                theme={theme}
                defaultSelectedKeys={['1']}
            >
                <Profile>
                    <Avatar
                        size={64}
                        icon={<AntDesignOutlined />}
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <Nickname>{ me.nickname }</Nickname>
                    <p>"카르페디엠"</p>
                </Profile>
                <Menu.Item key="1" icon={<HomeOutlined />} className={ router.pathname == '/home' ? 'ant-menu-item-selected ant-menu-item' : ''}> 
                    <Link href="/home"><a>홈</a></Link>
                </Menu.Item>
                <SubMenu key="sub1" icon={<DatabaseOutlined />} title="모아 보기">
                    <Menu.Item key="2" className={ router.pathname == '/alltodolist' ? 'ant-menu-item-selected ant-menu-item' : ''}>
                        <Link href="/alltodolist"><a>공부 계획</a></Link>
                    </Menu.Item>
                    <Menu.Item key="3" className={ router.pathname == '/allDdaylist' ? 'ant-menu-item-selected ant-menu-item' : ''}>
                        <Link href="/allDdaylist"><a>D-day</a></Link>
                    </Menu.Item>
                </SubMenu>
                {/* <Menu.Item key="3" icon={<BarChartOutlined />}>
                    <Link href="/analysis"><a>주간/월간 분석</a></Link>
                </Menu.Item> */}
                <AddBtnWrapper>
                    <Button 
                        type="primary" 
                        shape="round" 
                        icon={<PlusOutlined />} 
                        size={'large'} 
                        onClick={onClickWriteBtn}
                        style={{width: '100%',backgroundColor: '#7262fd', color: 'white', border: 'none'}}
                        >
                        계획 / D-day 추가
                    </Button>
                </AddBtnWrapper>     
                <Logout>
                    <a style={{color: '#9a9494'}} onClick={onClickLogout}>로그아웃</a>
                </Logout>   
                {/* <Switch onChange={onChangeTheme} /> 다크 모드 */}
            </PcWebMenu>
        </>
    );
};

export default DesktopMenu;
