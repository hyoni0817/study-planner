import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Button, Row, Col, Checkbox } from 'antd';
import styled from 'styled-components';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST, USER_ID_CHECK_REQUEST, } from '../reducers/user';
import { SEARCH_TODO_LIST_FAILURE } from '../reducers/todo';

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

const reponsive = {
    width: '100%',
    height: 'auto',
}

const SignUp = (props) => {
    const dispatch = useDispatch();
    const { me, isSignedUp, isSigningUp, isUserIdChecked, existingUserId, isUserIdChecking } = useSelector(state => state.user);
    
    const [ form ] = Form.useForm();
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [terms, setTerms] = useState(false);
    const [birthYear, setBirthYear] = useState('');
    const [idBtnClick, setIdBtnClick] = useState(false);
    const [idInputStat, setIdInputStat] = useState(false);

    useEffect(() => {
        if(idInputStat) {
            form.validateFields(['userId']);
        }
    }, [existingUserId, idBtnClick, idInputStat]);

    useEffect(() => {
        if(me) {
            Router.push('/home');
        }
    }, [me && me.id])

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }
    const onChangeUserId = (e) => {
        setIdInputStat(true);
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

    const onIdCheck = () => {
        setIdBtnClick(true);
        dispatch({
            type: USER_ID_CHECK_REQUEST,
            data: {
                userId,
            }
        })
    }

    const onRuleHandler = (idBtnCheckStat) => ({
        validator(_, value) {
            if (!value || value!==userId) { 
                setIdBtnClick(false);
                return Promise.resolve();
            } else if(!idBtnCheckStat) {
                return Promise.reject(new Error('아이디 중복 체크를 해주세요'))
            } else if (existingUserId) {
                return Promise.reject(new Error('중복되는 아이디가 있습니다'));
            } else if (userId == '') {
                return Promise.reject(new Error('아이디를 입력해주세요'));
            }
            return Promise.resolve();
        }
      })

    return (
        <>
            { isSignedUp ? 
                <>
                    <div style={{width: '100%', height: 'auto', textAlign: 'center'}}>
                        <p>회원 가입이 완료되었어요!</p>
                        <Image
                            src="https://devwebdata2020.s3.ap-northeast-2.amazonaws.com/StudyPlanner/main/completed.svg"
                            alt="Picture of the author"
                            width={400}
                            height={400}
                            style={reponsive}
                        />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Button type="primary" size="default"><Link href="/login"><a>로그인 하러 가기</a></Link></Button>
                    </div>
                </> : 
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
                                            validator
                                            rules={[{required: true, message: '아이디를 입력해주세요'}, onRuleHandler(idBtnClick)]}
                                        >
                                            <Input value={userId} onChange={onChangeUserId} style={{marginRight: '3%', width: '65%'}}/>
                                        </Form.Item>
                                        <Button type="primary" style={{width: '32%', backgroundColor: '#7262fd', color: 'white', border: 'none', fontSize: '15px'}} onClick={onIdCheck} loading={isUserIdChecking}>
                                            중복 체크
                                        </Button>
                                        { userId && isUserIdChecked && !existingUserId && idBtnClick ? <p>사용 가능한 아이디 입니다.</p> : ''}
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
                                        </Form.Item>                            
                                    </Form.Item>
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
                                        <Checkbox onChange={onChangeTerms}>(개인정보 처리 방침_링크 사용하기)약관에 동의합니다.</Checkbox>
                                    </Form.Item>
                                    <Form.Item label=" " colon={false}>
                                        <Button type="primary" htmlType="submit" loading={isSigningUp} style={{backgroundColor: '#7262fd', color: 'white', border: 'none', width: '100%'}}>
                                            가입하기
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </section>
                </> 
            }
        </>
    )
}

export default SignUp;