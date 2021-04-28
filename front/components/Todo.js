import React, { useCallback } from 'react';
import { Tag } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import SearchTodoView from './SearchTodoView';

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
  
`;

const TodoCompletionStatusCell = styled.td`
  vertical-align: middle;
  text-align: center;
  width: 50px;
`;

const TodoEditAndDeleteCell = styled.td`
 text-align: right;
`;

const TodoImportantStatus = styled.p`
  color: red;
  margin-bottom: 0;
`;


const TodoTitle = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap;
  font-weight: 600; 
  margin-top: 5px;
  margin-bottom: 0;
`;

const Todo = ({post, view}) => {
    const dispatch = useDispatch();
    const completed = post.completion;

    const TodoBoxTable = styled.table`
      border-radius: 5px;
      margin: 1.5% 1.5%;
      width: ${ view == `search` || view == `now` ? `100%` : `47%`};
      height: ${ view == `now` ? `70px` : `100px`};
      color: ${ view == `now` ? `black` : `#ffffffe8`};
      float: left;
      ${ view == `now` ? `` : `background: #F6BD16;`}
      table-layout: fixed;
      @media screen and (max-width:767px) {
        width:100%;
        margin: 1.5% 0;
      }
    }
    `;

    const CircleCheckBtn = styled.button`
      color: #F6BD16;
      height: 28px;
      width: 28px;
      background-color: ${completed ? 'white' : '#ffffffe8'};
      border-radius: 50%;
      display: block;
      cursor:pointer;
      border: 2px solid #F6BD16;
      margin: 10px;

      &: focus {
        outline: none;
      }
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
            post === undefined ? '' : view !== 'search' ?
            <TodoBoxTable>
              <tr>
                <TodoCompletionStatusCell>
                  <CircleCheckBtn onClick={onClickCheckBtn}>{ completed ? <CheckOutlined /> : '' }</CircleCheckBtn>
                </TodoCompletionStatusCell>
                <td>
                  <TodoDetailCell>
                    <TodoTime>
                      {post.important ? <TodoImportantStatus><ExclamationCircleOutlined />중요</TodoImportantStatus> : ''}
                      {view === 'now' ? '' : post.allDayStatus ? '하루 종일' : `${post.startTime} - ${post.endTime}`}
                    </TodoTime>
                    <TodoTitle><Tag color="magenta">{post.subject}</Tag>{post.title}</TodoTitle>
                    분량은 {post.quantity} {post.unit}!
                  </TodoDetailCell>
                </td>
              </tr>
            </TodoBoxTable> :
            <SearchTodoView data={post} />
            }  
        </>
    );
};

export default Todo;