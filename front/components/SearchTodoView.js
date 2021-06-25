import React, { useCallback } from 'react';
import { Tag, Row, Col } from 'antd';
import { ExclamationCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux'
import { COMPLETE_TODO_REQUEST } from '../reducers/todo';
import EditFormButton from './EditFormButton';
import DeleteButton from '../containers/DeleteButton';

const TodoRow = styled(Row)`
  margin-bottom: 20px;
  background: #F6BD16;
  border-radius: 5px;
  color: #ffffffe8;
`
const TodoBox = styled.tr`
  margin-bottom: 20px;
  width: 100%;  
  background: #F6BD16;
`;

const TodoTimeCell = styled.div`
  padding-right: 10px;
  vertical-align: middle;
  text-align: right;
  width: 100px;
`;

const TodoDetailCell = styled.div`
  margin-top: 10px;
  text-align: left;
`;

const TodoCompletionStatusCell = styled.p`
  vertical-align: middle;
  text-align: left;
  width: 35px;
`;

const TodoEditAndDeleteCell = styled.div`
  text-align: right;
`;

const TodoImportantStatus = styled.p`
  color: red;
  margin-bottom: 0;
`;

const TodoTitle = styled.p`
  font-weight: 600; 
  font-size: 15px;
  margin-bottom: 0;
  margin-top: 10px;
`;

const CircleCheckBtn = styled.button`
  color: #F6BD16;
  height: 28px;
  width: 28px;
  background-color: ${props => props.completed ? 'white' : '#ffffffe8'};
  border-radius: 50%;
  display: block;
  cursor:pointer;
  border: 2px solid #F6BD16;
  margin: 10px;

  &: focus {
    outline: none;
  }
`;

const SearchTodoView = ({data}) => {
    const dispatch = useDispatch();
    const completed = data.completion;

    const onClickCheckBtn = useCallback(() => {
      if(!completed) {
        //완료
        dispatch({
          type: COMPLETE_TODO_REQUEST,
          data: {
            id: data.id,
            checkBtnState: true,
          }
        })
      } else {
        //완료 취소
        dispatch({
          type: COMPLETE_TODO_REQUEST,
          data: {
            id: data.id,
            checkBtnState: false,
          }
        })
      }
    }, [data && data.id, completed])

    return (
        <>
            <TodoRow>
              <Col span={2}>
                <CircleCheckBtn completed={completed} onClick={onClickCheckBtn}>{ completed ? <CheckOutlined /> : '' }</CircleCheckBtn>
              </Col>
              <Col span={22}>
                <TodoDetailCell>
                
                  {data.important ? <TodoImportantStatus><ExclamationCircleOutlined />중요</TodoImportantStatus> : ''}
                  {data.allDayStatus ? '하루 종일' : `${data.startTime} - ${data.endTime}`}
                
                  <TodoTitle><Tag color="magenta">{data.subject}</Tag>{data.title}</TodoTitle>
                  분량은 {data.quantity} {data.unit}!
                </TodoDetailCell>
                <TodoEditAndDeleteCell>
                  <EditFormButton data={data} type="todo" />
                  <DeleteButton id={data.id} type="todo" />
                </TodoEditAndDeleteCell>
              </Col>
            </TodoRow>     
            
        </>
    );
};

export default SearchTodoView;