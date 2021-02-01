import React from 'react';
import { Card, Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const DdayBox = styled(Card)`
    background: linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b);
    border-radius: 5px;
    color: #ffffffe8;
`;

const Dday = () => {
    const { DdayList } = useSelector( state => state.todo )

    const calculateDday = (dueDate) => {
        const dateArr = dueDate.split('-');
        const now = new Date();
        const Dday = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);

        const gap = now.getTime() - Dday.getTime();
        const remainDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1; 
        return remainDay === 0 ? '-day' : ( remainDay < 0 ? `+${remainDay * -1}` : `-${remainDay}` );
    };

    return (
        <>
            <div style={{ padding: 15, textAlign: 'center', overflowX: 'auto', }}>
                <Row gutter={16} justify="center">
                    { 
                        DdayList.map((c) => {
                            return (
                                <Col xs={12} sm={6} md={10} lg={6} >
                                    <DdayBox bordered={false}>
                                        <p>D{ calculateDday(c.dueDate) }</p>
                                        <span>{c.title}</span>
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