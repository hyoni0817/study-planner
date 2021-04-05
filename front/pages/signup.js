import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import styled from 'styled-components';

//import { } from '../reducers/user';

const SignUpTitle = styled.h3`
    text-align: center;
`

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const SignUp = (props) => {
    const [ form ] = Form.useForm();
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');

    const onChangeUserId = (e) => {
        setUserId(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangePasswordCheck = (e) => {
        setPasswordCheck(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <>
            <SignUpTitle>회원 가입</SignUpTitle>
            <section>
                <Row type="flex" justify="center" align="middle" style={{minHeight: '100vh'}}>
                    <Col>
                        <Form 
                            {...formItemLayout}
                            layout="vertical"
                            initialValues={{ size: 'default' }}
                            size="default"
                            onFinish={ onFinish }
                            form={form}
                        >
                            <Form.Item 
                                label="아이디" 
                                colon={false}
                            >
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <Form.Item
                                        name="userId"
                                        noStyle
                                        rules={[{ required: true, message: '아이디를 입력해주세요' }]}
                                        >
                                            <Input value={userId} onChange={onChangeUserId} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={7}>
                                        <Button type="primary" style={{backgroundColor: '#7262fd', color: 'white', border: 'none'}}>
                                            중복 체크
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                            <Form.Item 
                                label="비밀 번호" 
                                colon={false}
                                name="password"
                                rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
                            >
                                <Input.Password value={password} onChange={onChangePassword} />
                            </Form.Item>
                            <Form.Item 
                                label="비밀 번호 확인" 
                                colon={false}
                                name="passwordCheck"
                                rules={[{ required: true, message: '비밀번호를 확인을 위해 다시 입력해주세요' }]}
                            >
                                <Input.Password value={passwordCheck} onChange={onChangePasswordCheck} />
                            </Form.Item>
                            <Form.Item 
                                label="닉네임" 
                                colon={false}
                                name="nickname"
                                rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
                            >
                                <Input value={nickname} onChange={onChangeNickname} />
                            </Form.Item>
                            <Form.Item 
                                label="이메일" 
                                colon={false}
                                name="email"
                                rules={[{ required: true, message: '이메일을 입력해주세요' }]}
                            >
                                <Input value={email} onChange={onChangeEmail} />
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#7262fd', color: 'white', border: 'none', width: 320}}>
                                    가입하기
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default SignUp;