import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN_REQUEST } from '../reducers/user';

const LoginError = styled.div`
    color: red;
`;

const LoginBtn = styled(Button)`
    width: 100%;
    background-color: #7262fd;
    border: none;
`;

const LoginForm = ({onClose}) => {
    const dispatch = useDispatch();
    const { loginErrorReason, isLoggedIn, isLoggingIn } = useSelector(state => state.user);

    const [userId, onChangeUserId] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [rememberLogin, onChangeRememberLogin] = useInput(false);

    const onFinish = (values) => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: {
                userId,
                password,
                rememberLogin,
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
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="아이디" value={userId} onChange={onChangeUserId} autocomplete="off" />
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
                        <Form.Item name="remember">
                            <Checkbox onChange={onChangeRememberLogin}>로그인 상태 유지</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <LoginBtn type="primary" loading={isLoggingIn} htmlType="submit">
                                로그인 하기
                            </LoginBtn>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default LoginForm;