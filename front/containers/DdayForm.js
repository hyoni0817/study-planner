import React, { useState } from 'react';
import { Form, DatePicker, Input, Button } from 'antd';
import { useRouter } from 'next/router';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DDAY_REQUEST } from '../reducers/dday';


const DdayForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { DdayPostId } = useSelector(state => state.dday);

    const [ DdayId, setDdayId ] = useState(DdayPostId);
    const [ title, setTitle ] = useState('');
    const [ memo, setMemo ] = useState('');
    const [ dueDate, setDueDate ] = useState('');

    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    };

    const onChangeContent = (e) => {
        setMemo(e.target.value);
    };

    const onChangeDueDate = (date, dateString) => {
        setDueDate(dateString);
    };

    const onFinish = values => {
        setDdayId( DdayId => DdayId + 1);
        dispatch({
            type: ADD_DDAY_REQUEST,
            data: {
                DdayPostId: DdayId,
                title,
                memo,
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
                initialValues={{
                    size: 'default',
                }}
                size="default"
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
                <Form.Item label="메모" colon={false}>
                    <Form.Item
                    name="ddaymemo"
                    noStyle
                    >
                        <Input style={{ width: 160 }} placeholder="추가하고 싶은 메모가 있다면 입력해주세요" value={memo} onChange={onChangeContent} />
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