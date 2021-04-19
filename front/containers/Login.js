import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';

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
            >
                <Form
                    {...layout}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="ID"
                        name="userId"
                        rules={[
                        {
                            required: true,
                            message: '아이디를 입력해주세요.',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: '비밀 번호를 입력해주세요.',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login;