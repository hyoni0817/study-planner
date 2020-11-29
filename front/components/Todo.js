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

const Todo = ({post}) => {
    return (
        <>
          <Card 
              type="inner" 
              title={post.title} 
              extra={
                  <Dropdown.Button onClick={handleButtonClick} overlay={menu} />
              }
          >
              <b>학습 분량</b> 0 / {post.quantity} {post.unit}
              <Checkbox onChange={onChange}>Checkbox</Checkbox>
              <br />
              <Tag color="magenta">{post.subjects}</Tag>
          </Card>
        </>
    );
};

export default Todo;