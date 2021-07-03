import React, { useEffect, useState } from 'react';
import { Form, DatePicker, Input, Button } from 'antd';
import { useRouter } from 'next/router';
import useInput from '../hooks/useInput';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_DDAY_REQUEST, EDIT_DDAY_REQUEST } from '../reducers/dday';


const DdayForm = ({mode, data, onSubmit}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const moment = require('moment');
    const dateDefaultValue = mode == 'edit' ? {defaultValue : moment(data.dueDate, 'YYYY-MM-DD')} : {};
    const [ form ] = Form.useForm();

    const [ dueDate, setDueDate ] = useState(mode == 'edit' ? data.dueDate :'');
    
    //useInput
    const [ title, onChangeTitle ] = useInput(mode == 'edit' ? data.title : '');
    const [ memo, onChangeContent ] = useInput(mode == 'edit' ? data.memo : '');

    const onChangeDueDate = (date, dateString) => {
        setDueDate(dateString);
    };

    const onFinish = values => {
        dispatch({
            type: ADD_DDAY_REQUEST,
            data: {
                title,
                memo,
                dueDate,
            }
        });

        return router.push('/home');
    };

    const onEditFinish = values => {
        console.log({data});
        dispatch({
            type: EDIT_DDAY_REQUEST,
            data: {
                id: data.id,
                title,
                memo,
                dueDate,
            },
        });
        onSubmit();
    };

    useEffect(() => {
        if(mode == "edit" && !dueDate) {
            form.validateFields(['ddaydate']);
        }
    }, [dueDate]);

    useEffect(() => {
        if(mode == "edit" && !title) {
            form.validateFields(['ddaytitle']);
        }
    }, [title]);

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
                onFinish={ mode == 'edit' ? onEditFinish : onFinish}
                form={form}
            >
                <Form.Item label="제목" colon={false}>
                    <Form.Item
                    name="ddaytitle"
                    noStyle
                    valuePropName="value"
                    rules={[{ required: mode == 'edit' ? !title : true, message: '제목을 입력해주세요' }]}
                    >
                        <Input style={{ width: 320 }} defaultValue={ title } placeholder="D-day 제목을 입력해주세요" value={title} onChange={onChangeTitle} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="메모" colon={false}>
                    <Form.Item
                    name="ddaymemo"
                    noStyle
                    >
                        <Input style={{ width: 320 }} defaultValue={ memo } placeholder="추가하고 싶은 메모가 있다면 입력해주세요" value={memo} onChange={onChangeContent} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="날짜" colon={false}>
                    <Form.Item
                        name="ddaydate"
                        noStyle
                        rules={[{ required: mode == 'edit' ? !dueDate : true, message: '날짜를 입력해주세요' }]}
                    >
                        <DatePicker {...dateDefaultValue} onChange={onChangeDueDate} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" style={{backgroundColor: '#7262fd', color: 'white', border: 'none'}}>
                        완료
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default DdayForm;