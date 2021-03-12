import React, { useCallback } from 'react';
import { Tag } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux'
import { COMPLETE_TODO_REQUEST } from '../reducers/todo';
import EditFormButton from './EditFormButton';

const TodoBox = styled.tr`
  margin-bottom: 20px;
  width: 100%;
`;

const TodoTimeCell = styled.td`
  padding-right: 10px;
  border-right: 2px solid black; 
  vertical-align: middle;
  text-align: right;
  width: 100px;
`;

const TodoDetailCell = styled.td`
  text-align: left;
`;

const TodoCompletionStatusCell = styled.td`
  vertical-align: middle;
  text-align: left;
  width: 35px;
`;

const TodoEditAndDeleteCell = styled.td`

`;

const TodoImportantStatus = styled.p`
  margin-bottom: 0;
`;

const TodoTitle = styled.p`
  margin-bottom: 0;
`;

const Todo = ({post, view}) => {
    const dispatch = useDispatch();
    const completed = post.completion;

    const CircleCheckBtn = styled.button`
      height: 25px;
      width: 25px;
      background-color: ${completed ? 'red' : '#bbb'};
      border-radius: 50%;
      display: inline-block;
      cursor:pointer;
      border: none;
    `;

    const onClickCheckBtn = useCallback(() => {
      if(!completed) {
        //완료
        dispatch({
          type: COMPLETE_TODO_REQUEST,
          data: {
            id: post.id,
            checkBtnState: true,
          }
        })
      } else {
        //완료 취소
        dispatch({
          type: COMPLETE_TODO_REQUEST,
          data: {
            id: post.id,
            checkBtnState: false,
          }
        })
      }
    }, [post && post.id, completed])

    return (
        <>
          {
            post === undefined ? '' :
            <TodoBox>
              <TodoCompletionStatusCell>
                <CircleCheckBtn onClick={onClickCheckBtn}>{ completed ? <CheckOutlined /> : '' }</CircleCheckBtn>
              </TodoCompletionStatusCell>
              <TodoTimeCell>
                {post.important ? <TodoImportantStatus><ExclamationCircleOutlined />중요</TodoImportantStatus> : ''}
                {post.allDayStatus ? '하루 종일' : `${post.startTime} - ${post.endTime}`}
              </TodoTimeCell>
              <TodoDetailCell>
                <TodoTitle><Tag color="magenta">{post.subject}</Tag>{post.title}</TodoTitle>
                0 / {post.quantity} {post.unit}
              </TodoDetailCell>
              { view == 'search' ? 
              <TodoEditAndDeleteCell>
                <EditFormButton data={post} type="todo" />
              </TodoEditAndDeleteCell>
              : '' }
            </TodoBox>     
            }  
        </>
    );
};

export default Todo;