import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DdayBox = styled.div`
    background: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);
    border-radius: 5px;
    color: #ffffffe8;
    padding: 12px;
`;

const DdayContent = styled.p`
    font-size: 25px;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-family: 'Fredoka One', cursive;
`;

const DdayTitle = styled.p`
    font-size: 13px;
    text-align: left;
    margin-bottom: 0;
`;

const DdayDate = styled.p`
    font-size: 13px;
    text-align: right;
    margin-bottom: 7px;
`
const Dday = () => {
    const { DdayList } = useSelector( state => state.todo )

    const calculateDday = (dueDate) => {
        const dateArr = dueDate.split('-');
        const now = new Date();
        const Dday = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);

        const gap = now.getTime() - Dday.getTime();
        const remainDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1; 
        return remainDay === 0 ? ' - day' : ( remainDay < 0 ? `+${remainDay * -1}` : ` - ${remainDay}` );
    };

    return (
        <>
            <div style={{ padding: '15px 15px 15px 0', textAlign: 'center', overflowX: 'auto', }}>
                <Row gutter={16} justify="center" style={{ marginRight: '0', }}>
                    { 
                        DdayList.map((c) => {
                            return (
                                <Col xs={12} sm={6} md={10} lg={6} >
                                    <DdayBox bordered={false}>
                                        <DdayDate>{c.dueDate} 까지</DdayDate>
                                        <DdayTitle>{c.title}</DdayTitle>
                                        <DdayContent>D{ calculateDday(c.dueDate) }</DdayContent>
                                    </DdayBox> 
                                </Col>
                            )
                        })  
                    }                    
                </Row>
            </div> 
        </>
    )
};

export default Dday;