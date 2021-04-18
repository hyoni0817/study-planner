import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import styled from 'styled-components';

//redux
import { useDispatch } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const SignUpTitle = styled.h3`
    text-align: center;
`

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      md: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      md: { span: 24 },
    },
  };

const SignUp = (props) => {
    const dispatch = useDispatch();

    const [ form ] = Form.useForm();
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [terms, setTerms] = useState(false);
    const [birthYear, setBirthYear] = useState('');


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
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

    const onChangeBirthYear = (e) => {
        setBirthYear(e.target.value);
    }

    const onChangeTerms = (e) => {
        setTerms(e.target.checked);
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                username,
                userId,
                password,
                nickname,
                birthYear,
                email,
                terms,
            }
        })
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
                            size="large"
                            onFinish={ onFinish }
                            form={form}
                        >
                            <Form.Item 
                                label="이름" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="username"
                                    noStyle
                                    rules={[{ required: true, message: '이름을 입력해주세요' }]}
                                >
                                    <Input value={username} onChange={onChangeUsername} />
                                </Form.Item>                            
                            </Form.Item>
                            <Form.Item 
                                label="아이디" 
                                colon={false}
                            >
                                    <Form.Item
                                        name="userId"
                                        noStyle
                                        rules={[{ required: true, message: '아이디를 입력해주세요' }]}
                                    >
                                        <Input value={userId} onChange={onChangeUserId} style={{marginRight: '3%', width: '67%'}}/>
                                    </Form.Item>
                                    <Button type="primary" style={{width: '30%', backgroundColor: '#7262fd', color: 'white', border: 'none', fontSize: '15px'}}>
                                        중복 체크
                                    </Button>
                            </Form.Item>
                            <Form.Item 
                                label="비밀 번호" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="password"
                                    noStyle
                                    rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
                                >
                                    <Input.Password value={password} onChange={onChangePassword} />
                                </Form.Item>                            
                            </Form.Item>
                            <Form.Item 
                                label="비밀 번호 확인" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="passwordCheck"
                                    noStyle
                                    rules={[{ required: true, message: '비밀번호를 확인을 위해 다시 입력해주세요' }]}
                                >
                                    <Input.Password value={passwordCheck} onChange={onChangePasswordCheck} />
                                </Form.Item>                            </Form.Item>
                            <Form.Item 
                                label="닉네임" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="nickname"
                                    noStyle
                                    rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
                                >
                                    <Input value={nickname} onChange={onChangeNickname} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item 
                                label="테어난 년도" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="birthYear"
                                    noStyle
                                    rules={[{ required: true, message: '태어난 년도를 입력해주세요' }]}
                                >
                                    <Input value={birthYear} onChange={onChangeBirthYear} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item 
                                label="이메일" 
                                colon={false}
                            >
                                <Form.Item 
                                    name="email"
                                    noStyle
                                    rules={[{ required: true, message: '이메일을 입력해주세요' }]}
                                >
                                    <Input value={email} onChange={onChangeEmail} />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item 
                                name="terms" 
                                valuePropName="checked"
                                rules={[{ validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('약관 동의를 체크해주세요.')), }]}
                            >
                                {/* <TermsStyle>
                                    약관 내용
                                </TermsStyle> */}
                                <Checkbox onChange={onChangeTerms}>약관에 동의합니다.</Checkbox>
                            </Form.Item>
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit" style={{backgroundColor: '#7262fd', color: 'white', border: 'none', width: '100%'}}>
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