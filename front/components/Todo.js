import React from 'react';
import { Checkbox, Tag } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const TodoBox = styled.div`
  margin-bottom: 20px;
  display: table-row;
  width: 100%;
`;

const TodoTimeCell = styled.div`
  display: table-cell;
  padding-right: 10px;
  border-right: 2px solid black; 
  vertical-align: middle;
  text-align: right;
`;

const TodoDetailCell = styled.div`
  display: table-cell;
  text-align: left;
`;

const TodoCompletionStatusCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: right;
`;

const TodoImportantStatus = styled.p`
  margin-bottom: 0;
`;

const TodoTitle = styled.p`
  margin-bottom: 0;
`;

const Todo = ({post}) => {
    const onChange = (e) => {
      console.log(`checked = ${e.target.checked}`);
    }

    return (
        <>
          {
            post === undefined ? '' :
            <TodoBox>
              <TodoTimeCell>
                {post.important ? <TodoImportantStatus><ExclamationCircleOutlined />중요</TodoImportantStatus> : ''}
                {post.allDayStatus ? '하루 종일' : `${post.startTime} - ${post.endTime}`}
              </TodoTimeCell>
              <TodoDetailCell>
                <TodoTitle><Tag color="magenta">{post.subject}</Tag>{post.title}</TodoTitle>
                0 / {post.quantity} {post.unit}
              </TodoDetailCell>  
              <TodoCompletionStatusCell>
                <Checkbox onChange={onChange}>Checkbox</Checkbox>
              </TodoCompletionStatusCell>
            </TodoBox>     
            }  
        </>
    );
};

export default Todo;