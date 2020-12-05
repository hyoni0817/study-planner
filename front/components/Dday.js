import React from 'react';
import { Card, Col, Row } from 'antd';

const Dday = ({post}) => {
    const calculateDday = () => {
        const dateArr = post.dueDate.split('-');
        const now = new Date();
        const Dday = new Date(dateArr[0], dateArr[1]-1, dateArr[2]);

        const gap = now.getTime() - Dday.getTime();
        const remainDay = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1; 
        return remainDay === 0 ? '-day' : ( remainDay < 0 ? `+${remainDay * -1}` : `-${remainDay}` );
    };

    return (
        <>
            <div style={{ padding: 15, textAlign: 'center' }}>
                <Row gutter={16} justify="center">
                    <Col xs={12} sm={6} md={10} lg={6} >
                        {
                            post === undefined ? '' : 
                            <Card bordered={false}>
                                <p>D{ calculateDday() }</p>
                                <span>{post.title}</span>
                            </Card> 
                        }
                    </Col>
                </Row>
            </div> 
        </>
    )
};

export default Dday;