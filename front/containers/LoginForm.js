import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginError = styled.div`
    color: red;
`;

const LoginForm = ({onClose}) => {
    const dispatch = useDispatch();
    const { loginErrorReason, isLoggedIn } = useSelector(state => state.user);

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUserId = (e) => {
        setUserId(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId,
                password
            }
        });

        if(isLoggedIn) {
            onClose();
        };
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" value={userId} onChange={onChangeUserId} />
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
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="비밀 번호" value={password} onChange={onChangePassword} />
                        </Form.Item>
                        <LoginError>{loginErrorReason}</LoginError>
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