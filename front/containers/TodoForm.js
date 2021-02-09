import React, { useState } from 'react';
import { Form, Select, Divider, Input, Checkbox, Button, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODO } from '../reducers/todo';

const { Option } = Select;

let index = 0;

const TodoForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { todoPostId } = useSelector(state => state.todo);

    const { RangePicker } = TimePicker;
    const format = 'HH:mm';

    const [ todoId, setTodoId ] = useState(todoPostId);
    const [ title, setTitle ] = useState('');
    const [ subjects, setSubjects ] = useState([]);
    const [ subjectName, setSubjectName ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ unit, setUnit ] = useState('개');
    const [ important, setImporant ] = useState(false);
    const [ selectSubject, setSelectSubject ] = useState('');
    const [ startTime, setStartTime ] = useState('');
    const [ endTime, setEndTime ] = useState('');
    const [ allDayStatus, setAllDayStatus ] = useState(false);
    const onChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const onChangeSubjectName = (e) => {
        setSubjectName(e.target.value);
    };

    const addSubject = () => {
        setSubjects([...subjects, subjectName || `New item ${index++}`]);
        setSubjectName('');
    };

    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }
    
    const onChangeUnit = (value) => {
        setUnit(value);
    }

    const onChangeTime = (value) => {
        setStartTime(moment(value[0]["_d"]).format(format));
        setEndTime(moment(value[1]["_d"]).format(format));
    }
    function onChangeAllDayCheckBox(e) {
        console.log(`checked = ${e.target.checked}`);
        setAllDayStatus(e.target.checked);
      }

    const onChangeCheckbox = (e) => {
        setImporant(e.target.checked);
    }

    const onChangeSelectValue = value => {
        console.log("selectValue:", value);
        setSelectSubject(value);
    }

    const onFinish = values => {
        setTodoId( todoId => todoId + 1);
        dispatch({
            type: ADD_TODO,
            data: {
                todoPostId: todoId,
                title,
                selectSubject,
                quantity,
                unit,
                important,
                startTime,
                endTime,
            },
        });

        return router.push('/')
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
                <Form.Item label="계획명" colon={false}>
                    <Form.Item
                    name="todoTitle"
                    noStyle
                    rules={[{ required: true, message: '내용을 입력해주세요' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="계획명을 입력해주세요" value={title} onChange={onChangeTitle} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="과목" colon={false}>
                    <Form.Item
                        name="subject"
                        noStyle
                        rules={[{ required: true, message: '과목을 선택해주세요' }]}
                    >
                        <Select
                            style={{ width: 240 }}
                            placeholder="과목 선택"
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={subjectName} onChange={onChangeSubjectName} />
                                        <a
                                            style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                            onClick={addSubject}
                                        >
                                            <PlusOutlined /> 과목 추가
                                        </a>
                                    </div>
                                </div>
                            )}
                            onChange={onChangeSelectValue}
                        >
                            {
                                subjects.map(item => (
                                    <Option key={item}>{item}</Option> // 코드 정렬 git에 올리기, 여기서 value값 추가하기
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="분량" colon={false} style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="quantity"
                    rules={[{ required: true, message: '분량을 입력해주세요' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input value={ quantity } onChange={ onChangeQuantity } placeholder="분량을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                    name="unit"
                    rules={[{ required: false }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Select
                            defaultValue="개"
                            style={{ width: 120 }} 
                            onChange={onChangeUnit}
                        >
                            <Option value="개">개</Option>
                            <Option value="문제">문제</Option>
                            <Option value="쪽">쪽</Option>
                            <Option value="없음">없음</Option>
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="시간" colon={false} style={{ marginBottom: 0 }}>
                    <RangePicker placeholder={['시작', '마감']} format={format} onChange={onChangeTime} disabled={allDayStatus} />
                    <Checkbox onChange={onChangeAllDayCheckBox}>종일</Checkbox>
                </Form.Item>
                <Form.Item label="중요" colon={false} style={{ marginBottom: 0 }}>
                <Checkbox onChange={onChangeCheckbox} />
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

export default TodoForm;