import React, { useState } from 'react';
import { Form, DatePicker, Input, Button } from 'antd';
import { useRouter } from 'next/router';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DDAY } from '../reducers/todo';


const DdayForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const router = useRouter();
    const dispatch = useDispatch();
    const { DdayPostId } = useSelector(state => state.todo);

    const [ DdayId, setDdayId ] = useState(DdayPostId);
    const [ title, setTitle ] = useState('');
    const [ contents, setContents ] = useState('');
    const [ dueDate, setDueDate ] = useState('');

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeContent = (e) => {
        setContents(e.target.value);
    };

    const onChangeDueDate = (date, dateString) => {
        setDueDate(dateString);
    };

    const onFinish = values => {
        console.log('Received values of form: ', values);
        setDdaysId( DdayId => DdayId + 1);
        dispatch({
            type: ADD_DDAY,
            data: {
                DdayPostId: DdayId,
                title,
                contents,
                dueDate,
            }
        });

        return router.push('/');
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
                    name="ddaytitle"
                    noStyle
                    rules={[{ required: true, message: '제목을 입력해주세요' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="D-day 제목을 입력해주세요" value={title} onChange={onChangeTitle} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="내용" colon={false}>
                    <Form.Item
                    name="ddaycontents"
                    noStyle
                    >
                        <Input style={{ width: 160 }} placeholder="추가하고 싶은 내용이 있다면 입력해주세요" value={contents} onChange={onChangeContent} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="날짜" colon={false}>
                    <Form.Item
                    name="ddaydate"
                    noStyle
                    rules={[{ required: true, message: '날짜를 입력해주세요' }]}
                    >
                        <DatePicker onChange={onChangeDueDate} />
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