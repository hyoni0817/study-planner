import React, { useCallback } from 'react';
import { Tag } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux'
import { COMPLETE_TODO_REQUEST } from '../reducers/todo';
import EditFormButton from './EditFormButton';
import DeleteButton from '../containers/DeleteButton';



const TodoTime = styled.p`
  padding-right: 10px;
  //vertical-align: middle;
  text-align: left;
  margin-bottom: 0;
`;

const TodoDetailCell = styled.div`
  text-align: left;
  padding-top: ${props => props.view === 'now' ? '0' : '10px'};
  padding-bottom: ${props => props.view === 'search' || props.view === 'now' ? '0' : '10px'};
`;

const TodoCompletionStatusCell = styled.td`
  vertical-align: middle;
  text-align: center;
  width: 50px;
`;

const TodoEditAndDeleteCell = styled.div`
 text-align: right;
`;

const TodoImportantStatus = styled.span`
  color: red;
  margin-right: 8px;
  margin-bottom: 0;
`;


const TodoTitle = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  ${props => props.view === 'search' ? '' : 'overflow:hidden; text-overflow:ellipsis;white-space:nowrap;'}
  font-weight: 600; 
  margin-top: 5px;
  margin-bottom: 0;
`;

const CircleCheckBtn = styled.button`
  color: #7262fd;
  height: 28px;
  width: 28px;
  background-color: white;
  border-radius: 50%;
  display: block;
  cursor:pointer;
  border: 2px solid #7262fd;
  margin: 10px;

  &: focus {
    outline: none;
  }
`;

const TodoBoxTable = styled.table`
  border-radius: 5px;
  border: ${ props => props.view == `now` ? `` : `1px #7262fd solid` };
  margin: 1.5% 0;
  width: ${ props => props.view == `search` || props.view == `now` ? `100%` : `47%`};
  height: ${ props => props.view == `now` ? `70px` : `100px`};
  color: black;
  float: left;
  table-layout: fixed;
  border-collapse: separate;
  @media screen and (max-width:767px) {
    width:100%;
    margin: 1.5% 0;
  }
`;

const Todo = ({post, view}) => {
    const dispatch = useDispatch();
    const completed = post.completion;

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
              <>
                <TodoBoxTable view={view}>
                  <tr>
                    <TodoCompletionStatusCell>
                      <CircleCheckBtn completed={completed} onClick={onClickCheckBtn}>{ completed ? <CheckOutlined /> : '' }</CircleCheckBtn>
                    </TodoCompletionStatusCell>
                    <td>
                      <TodoDetailCell view={view}>
                        <TodoTime>
                          {post.important ? <TodoImportantStatus><ExclamationCircleOutlined />중요</TodoImportantStatus> : ''}
                          {view === 'now' ? '' : post.allDayStatus ? '🌞 하루 종일' : `✨ ${post.startTime} - ${post.endTime}`}
                        </TodoTime>
                        <TodoTitle view={view}><Tag>{post.subject}</Tag>{post.title}</TodoTitle>
                        분량은 {post.quantity} {post.unit}!
                      </TodoDetailCell>
                      {
                        view === 'search' ? <>
                          <TodoEditAndDeleteCell>
                            <EditFormButton data={post} type="todo" />
                            <DeleteButton id={post.id} type="todo" />
                          </TodoEditAndDeleteCell>
                        </> : ''
                      }
                    </td>
                  </tr>
                </TodoBoxTable> 
              </>
            }  
        </>
    );
};

export default Todo;