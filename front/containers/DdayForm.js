import React, { useState } from 'react';
import { Form, DatePicker, Input, Button } from 'antd';

function onChange(date, dateString) {
  console.log(date, dateString);
}

const DdayForm = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            <Form 
                labelCol={{
                    span: 4,
                }}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                initialValues={{
                size: componentSize,
                }}
                size={componentSize}
                onFinish={onFinish}
            >
                <Form.Item label="제목" colon={false}>
                    <Form.Item
                    name="todocontents"
                    noStyle
                    rules={[{ required: true, message: '제목을 입력해주세요' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="D-day 제목을 입력해주세요" />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="내용" colon={false}>
                    <Form.Item
                    name="todocontents"
                    noStyle
                    >
                        <Input style={{ width: 160 }} placeholder="추가하고 싶은 내용이 있다면 입력해주세요" />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="날짜" colon={false}>
                    <Form.Item
                    name="todocontents"
                    noStyle
                    rules={[{ required: true, message: '날짜를 입력해주세요' }]}
                    >
                        <DatePicker onChange={onChange} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit">
                        완료
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default DdayForm;