import React from 'react';
import { Card, Menu, Dropdown, Button, message, Tooltip, Checkbox, Tag } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const handleButtonClick = (e) => {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
}

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
}

const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
);

const TodayList = () => {
    return (
        <>
            <Card 
                type="inner" 
                title="영어 단어 10개 외우기" 
                extra={
                    <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
                }
            >
                <b>학습 분량</b> 0 / 10 개
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                <br />
                <Tag color="magenta">영어</Tag>
            </Card>
            <Card
                style={{ marginTop: 16 }}
                type="inner"
                title="수학 오답노트 문제 5개 정리하기"
                extra={
                    <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
                }
            >
                <b>학습 분량</b> 0 / 5 개
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                <br />
                <Tag color="volcano">수학</Tag>
            </Card>
        </>
    );
};

export default TodayList;