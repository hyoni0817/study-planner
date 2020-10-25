import React from 'react';
import { Card, Col, Row } from 'antd';

const Dday = () => {
    return (
        <>
            <div style={{ padding: 15, textAlign: 'center' }}>
                <Row gutter={16} justify="center">
                    <Col xs={12} sm={6} md={10} lg={6} >
                        <Card bordered={false}>
                            <p>D-10</p>
                            <span>영어 듣기 시험</span>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={10} lg={6}>
                        <Card bordered={false}>
                            <p>D-30</p>
                            <span>수학 쪽지 시험</span>
                        </Card>
                    </Col>
                    <Col xs={12} sm={6} md={10} lg={6}>
                        <Card bordered={false}>
                            <p>D-100</p>
                            <span>영어 듣기 시험</span>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
};

export default Dday;