import React from 'react';
import { Card, Menu, Dropdown, Button, message, Tooltip, Checkbox, Tag } from 'antd';
import { DownOutlined, UserOutlined, StarFilled } from '@ant-design/icons';
import styled from 'styled-components';

const TodoBox = styled(Card)`
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Todo = ({post}) => {
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
    return (
        <>
          {
            post === undefined ? '' :
            <TodoBox 
              type="inner" 
              title={post.important ? <div><StarFilled style={{color: 'yellow'}} /> {post.title}</div> : post.title} 
              extra={
                  <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
              }
              headStyle={post.important ? {backgroundColor: 'pink'} : {}}
            >
                <b>학습 분량</b> 0 / {post.quantity} {post.unit}
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
                <br />
                <Tag color="magenta">{post.selectSubject}</Tag>
            </TodoBox> 
          }
        </>
    );
};

export default Todo;