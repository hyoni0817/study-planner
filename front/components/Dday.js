import React, { useCallback } from 'react';
import { Switch } from 'antd';
import { FileTextOutlined } from '@ant-design/icons'
import styled from 'styled-components';
import EditFormButton from  './EditFormButton';
import DeleteButton from '../containers/DeleteButton';

import { useDispatch } from 'react-redux';
import { SHOW_DDAY_REQUEST } from '../reducers/dday';

const DdayBox = styled.div`
    background: #7262fd;
    border-radius: 5px;
    color: #ffffffe8;
    padding: 12px;
    margin-bottom: 20px;
`;

const DdayContent = styled.p`
    font-size: 25px;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-weight: 800;
    font-family: sans-serif;
    //font-family: 'Fredoka One', cursive;
`;

const SearchModeDdayTitle = styled.p`
    font-size: 15px;
    text-align: left;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 0;
`;

const HomeModeDdayTitle = styled.p`
    font-size: 15px;
    font-weight: 600;
    text-align: left;
    margin: 5px 0;
    overflow:hidden; 
    text-overflow:ellipsis; 
    white-space:nowrap;
`;

const DdayDate = styled.p`
    font-size: 13px;
    text-align: right;
    margin-bottom: 7px;
`

const DdayMemo = styled.div`

`;

const DdayEditAndDeleteCell = styled.span`
    float: right;
`;

const Dday = ({data, view}) => {
    const viewState = data.viewState;

    const dispatch = useDispatch();

    const calculateDday = (dueDate) => {
        const dateArr = dueDate.split('-');
        const now = new Date();
        const Dday = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);

        const gap = now.getTime() - Dday.getTime();
        const remainDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1; 
        return remainDay === 0 ? ' - day' : ( remainDay < 0 ? `+${remainDay * -1}` : ` - ${remainDay}` );
    };

    const onChangeView = useCallback((checked) => {
      if(!viewState) {
        //완료
        dispatch({
          type: SHOW_DDAY_REQUEST,
          data: {
            id: data.id,
            viewState: true,
          }
        })
      } else {
        //완료 취소
        dispatch({
          type: SHOW_DDAY_REQUEST,
          data: {
            id: data.id,
            viewState: false,
          }
        })
      }
    }, [data && data.id, viewState])

    return (
        <>
            <DdayBox bordered={false}>
                <DdayDate>
                    { view == 'search' ? <span style={{float: 'left'}}>홈 화면에 나타내기 <Switch defaultChecked={data.viewState} onChange={onChangeView} /></span> : ''}
                    {data.dueDate} 까지
                </DdayDate>
                { view == 'search' ? <SearchModeDdayTitle>{data.title}</SearchModeDdayTitle> : <HomeModeDdayTitle>{data.title}</HomeModeDdayTitle> }
                { view === 'search' ? <DdayMemo><FileTextOutlined style={{fontSize: '15px', marginRight: '5px', marginTop: '5px'}}/>{ !!data.memo ? data.memo : '없음' }</DdayMemo> : ''}
                <DdayContent>
                    D{ calculateDday(data.dueDate) }
                    { view == 'search' ? 
                    <DdayEditAndDeleteCell>
                        <EditFormButton data={data} type="Dday" />
                        <DeleteButton id={data.id} type="Dday" />
                    </DdayEditAndDeleteCell>
                    : '' }
                </DdayContent>
            </DdayBox> 
        </>
    )
};

export default Dday;