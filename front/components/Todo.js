import React, { useState } from 'react';
import { Checkbox, Tag } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';
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
    let [ checkBtnColor, setCheckBtnColor ] = useState('#bbb');
    let [ checkBtnState, setCheckBtnState ] = useState(false);

    const CircleCheckBtn = styled.button`
      height: 25px;
      width: 25px;
      background-color: ${checkBtnColor};
      border-radius: 50%;
      display: inline-block;
      cursor:pointer;
      border: none;
    `;

    const onClickCheckBtn = () => {
      if(!checkBtnState) {
        setCheckBtnColor('red');
        setCheckBtnState(true);
      } else {
        setCheckBtnColor('#bbb');
        setCheckBtnState(false);
      }
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
              <CircleCheckBtn className="dot" onClick={onClickCheckBtn}>{ checkBtnState ? <CheckOutlined /> : '' }</CircleCheckBtn>
              </TodoCompletionStatusCell>
            </TodoBox>     
            }  
        </>
    );
};

export default Todo;