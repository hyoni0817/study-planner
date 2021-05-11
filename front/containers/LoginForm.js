import React from 'react';
import { Form, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//redux
//import {} from '../reducers/user';

const LoginForm = ({onClose}) => {

    const onFinish = (values) => {
        console.log('Success:', values);
        onClose();
    };

    return (
        <>
            <Row type="flex" justify="center" align="middle" style={{margin: '30px 0'}}>
                <Col>
                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="userId"
                            rules={[
                            {
                                required: true,
                                message: '아이디를 입력해주세요.',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                            {
                                required: true,
                                message: '비밀 번호를 입력해주세요.',
                            },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="비밀 번호"/>
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>로그인 상태 유지</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                로그인 하기
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default LoginForm;