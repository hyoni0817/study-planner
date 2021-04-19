import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

//redux
//import {} from '../reducers/user';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = ({isOpen}) => {
    const [visible, setVisible] = useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);
        setVisible(false);
        isOpen(false);
    };
    
    const onHandleCancel = e => {
        setVisible(false);
        isOpen(false);
    };

    return (
        <>
            <Modal
                visible={visible}
                footer={null}
                onCancel={onHandleCancel}
                okButtonProps={{ disabled: true }}
                cancelButtonProps={{ disabled: true }}
                width={400}
            >
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
            </Modal>
        </>
    )
}

export default Login;