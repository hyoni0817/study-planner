import React, { useState, useEffect } from 'react';
import { Form, Select, Divider, Input, Checkbox, Button, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import moment from 'moment';
import useInput from '../hooks/useInput';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODO_REQUEST, LOAD_SUBJECT_LIST_REQUEST, ADD_SUBJECT, EDIT_TODO_REQUEST } from '../reducers/todo';

const { Option } = Select;

let index = 0;

const TodoForm = ({mode, data, onSubmit}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { subjectList } = useSelector(state => state.todo);

    const { RangePicker } = TimePicker;
    const format = 'HH:mm';
    const [ form ] = Form.useForm();
    const subjectDefaultValue = mode == 'edit' ? {defaultValue: data.subject} : {} ;
    const timeDefaultValue = mode == 'edit' ? {defaultValue : [moment(data.startTime, format), moment(data.endTime, format)]} : {};
    const [ subjects, setSubjects ] = useState([]);
    const [ unit, setUnit ] = useState(mode == 'edit' ? data.unit : '개');
    const [ important, setImporant ] = useState(mode == 'edit' ? data.important : false);
    const [ selectSubject, setSelectSubject ] = useState(mode == 'edit' ? data.subject : '');
    const [ startTime, setStartTime ] = useState(mode == 'edit' ? data.startTime : '');
    const [ endTime, setEndTime ] = useState(mode == 'edit' ? data.endTime : '');
    const [ allDayStatus, setAllDayStatus ] = useState(mode == 'edit' ? data.allDayStatus : false);
    const [ checkTime, setCheckTime ] = useState(true);
    const [ timeOrAllDayClickStatus, setTimeOrAllDayClickStatus ] = useState(false);
    const [ subjectName, setSubjectName ] = useState(mode == 'edit' ? data.subject : '');

    //useInput
    const [ title, onChangeTitle ] = useInput(mode == 'edit' ? data.title : '');
    const [ quantity, onChangeQuantity ] = useInput(mode == 'edit' ? data.quantity : '');

    useEffect(() => {
        if(timeOrAllDayClickStatus) { 
            form.validateFields(['time']);
        }
    }, [checkTime, timeOrAllDayClickStatus]);

    useEffect(() => {
        dispatch({
            type: LOAD_SUBJECT_LIST_REQUEST,
        })
    }, []);

    useEffect(() => {
        if(mode == "edit" && !title) {
            form.validateFields(['todoTitle']);
        }
    }, [title]);

    useEffect(() => {
        if(mode == "edit" && !selectSubject) {
            form.validateFields(['subject']);
        }
    }, [selectSubject]);
    
    useEffect(() => {
        if(mode == "edit" && !quantity) {
            form.validateFields(['quantity']);
        }
    }, [quantity]);
    
    const addSubject = () => {
        dispatch({
            type: ADD_SUBJECT,
            data: {subject: subjectName},
        })
        setSubjectName('');
    }
    
    const onChangeUnit = (value) => {
        setUnit(value);
    }

    const onChangeTime = (value) => {
        setTimeOrAllDayClickStatus(true);
        if(value) {
            const startTimeFormat = moment(value[0]["_d"]).format(format);
            const endTimeFormat = moment(value[1]["_d"]).format(format); 
            setStartTime(startTimeFormat);
            setEndTime(endTimeFormat);
            startTimeFormat && endTimeFormat ? setCheckTime(false) : setCheckTime(true);    
        } else {
            setStartTime('');
            setEndTime('');
            setCheckTime(true);
        }    
    }
    function onChangeAllDayCheckBox(e) {
        setTimeOrAllDayClickStatus(true);
        console.log(`checked = ${e.target.checked}`);
        setAllDayStatus(e.target.checked);
        e.target.checked ? setCheckTime(false) : ( startTime && endTime ? setCheckTime(false) : setCheckTime(true));
    }

    const onChangeCheckbox = (e) => {
        setImporant(e.target.checked);
    }

    const onChangeSelectValue = value => {
        console.log("selectValue:", value);
        setSelectSubject(value);
    }

    const onFinish = values => {
        dispatch({
            type: ADD_TODO_REQUEST,
            data: {
                title,
                selectSubject,
                quantity,
                unit,
                important,
                startTime: allDayStatus ? 'none' : startTime,
                endTime: allDayStatus ? 'none' : endTime,
                allDayStatus,
            },
        });

        return router.back();
    };

    const onEditFinish = values => {
        dispatch({
            type: EDIT_TODO_REQUEST,
            data: {
                id: data.id,
                title,
                selectSubject,
                quantity,
                unit,
                important,
                startTime: allDayStatus ? 'none' : startTime,
                endTime: allDayStatus ? 'none' : endTime,
                allDayStatus,
            },
        });
        onSubmit();
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
                onFinish={ mode == 'edit' ? onEditFinish : onFinish }
                form={form}
            >
                <Form.Item label="계획명" colon={false}>
                    <Form.Item
                    name="todoTitle"
                    noStyle
                    rules={[{ required: mode == 'edit' ? !title : true, message: '내용을 입력해주세요' }]}
                    >
                        <Input style={{ width: 320 }} defaultValue={ title } placeholder="계획명을 입력해주세요" value={title} onChange={onChangeTitle} />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="과목" colon={false}>
                    <Form.Item
                        name="subject"
                        noStyle
                        rules={[{ required: mode == 'edit' ? !subjectName : true, message: '과목을 선택해주세요' }]}
                    >
                        <Select
                            style={{ width: 240 }}
                            placeholder="과목 선택"
                            {...subjectDefaultValue}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                        <Input style={{ flex: 'auto' }} value={subjectName} onChange={setSubjectName} />
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
                                subjectList.map(item => (
                                    <Option key={item.subject} value={item.subject}>{item.subject}</Option> // 코드 정렬 git에 올리기, 여기서 value값 추가하기
                                ))
                            }
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="분량" colon={false} style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="quantity"
                    rules={[{ required: mode == 'edit' ? !quantity : true, message: '분량을 입력해주세요' }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input value={ quantity } defaultValue={ quantity } onChange={ onChangeQuantity } placeholder="분량을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                    name="unit"
                    rules={[{ required: false }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Select
                            defaultValue="개"
                            defaultValue={ unit }
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
                    <Form.Item
                        name="time"
                        rules={[{ required: checkTime, message: '시간을 선택해주세요' }]}  
                    >
                        <RangePicker {...timeDefaultValue} placeholder={['시작', '마감']} format={format} onChange={onChangeTime} disabled={allDayStatus} />
                        <Checkbox onChange={onChangeAllDayCheckBox} checked={ allDayStatus } style={{ marginLeft: '10px', }}>종일</Checkbox>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="중요" colon={false} style={{ marginBottom: 0 }}>
                    <Checkbox onChange={onChangeCheckbox} checked={ important } />
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

export default TodoForm;