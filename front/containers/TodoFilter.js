import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Checkbox, Select, Form, Button } from 'antd';
import moment from 'moment';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_TODO_LIST_REQUEST, LOAD_SUBJECT_LIST_REQUEST } from '../reducers/todo';

const TodoFilter = () => {
    const dispatch = useDispatch();
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const dateFormat = 'YYYY-MM-DD';
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const [ form ] = Form.useForm();
    const { subjectList } = useSelector(state => state.todo);


    const [ todoTitle, setTodoTitle ] = useState('');
    const [ startDate, setStartDate ] = useState(moment(todayDate).format(dateFormat));
    const [ endDate, setEndDate ] = useState(moment(todayDate).format(dateFormat));
    const [ subjects, setSubjects ] = useState([]);
    const [ allDateCheckState, setllDateCheckState ] = useState(false);
    const [ checkDate, setCheckDate ] = useState(false);
    const [ dateOrAllDateClickState, setDateOrAllDateClickState ] = useState(false);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        }
    }

    useEffect(() => {
        if(dateOrAllDateClickState) {
            form.validateFields(['date']);
        }
        dispatch({
            type: LOAD_SUBJECT_LIST_REQUEST,
        })
    }, [checkDate, dateOrAllDateClickState]);

    const onChangeTodoTitle = (e) => {
        setTodoTitle(e.target.value);
    };

    const onChangeDate = (value) => {
        setDateOrAllDateClickState(true)
        if(value) {
            const startDateFormat = moment(value[0]["_d"]).format(dateFormat);
            const endDateFormat = moment(value[1]["_d"]).format(dateFormat); 
            setStartDate(startDateFormat);
            setEndDate(endDateFormat);
            startDateFormat && endDateFormat ? setCheckDate(false) : setCheckDate(true);    
        } else {
            setStartDate('');
            setEndDate('');
            setCheckDate(true);
        }    
    }

    const onChangeAllDateCheckBox = (e) => {
        setDateOrAllDateClickState(true);
        console.log(`checked = ${e.target.checked}`);
        setllDateCheckState(e.target.checked);
        e.target.checked ? setCheckDate(false) : ( startDate && endDate ? setCheckDate(false) : setCheckDate(true));
    }

    const onChangeSubjects = (value) => {
        setSubjects(value);
        console.log(`selected ${value}`);
    }

    const onFinish = (values) => {
        dispatch({
            type: SEARCH_TODO_LIST_REQUEST,
            data: {
                todoTitle,
                startDate,
                endDate,
                allDateCheckState,
                subjects,
            }
        })
    };

    return (
        <>
            <Form
                {...layout}
                name="searchForm"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="todoTitle"
                    rules={[{ required: true, min:2, message: '검색어를 2글자 이상 입력해주세요'}]}
                >
                    <Input placeholder="계획명을 입력해주세요" onChange={onChangeTodoTitle} />
                </Form.Item>
                <Form.Item
                    name="date"
                    rules={[{ required: checkDate, message: '날짜나 전체를 선택해주세요' }]}
                >
                    <RangePicker 
                        defaultValue={[moment(todayDate, dateFormat), moment(todayDate, dateFormat)]}
                        format={dateFormat}
                        onChange={onChangeDate}
                        disabled={allDateCheckState}
                    />      
                    <Checkbox onChange={onChangeAllDateCheckBox} style={{ marginLeft: '10px', }}>전체</Checkbox>
                </Form.Item>
                <Form.Item
                    name="subjects"
                >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="검색할 과목을 입력해주세요"
                        onChange={onChangeSubjects}
                    >
                        {subjectList.map(item => <Option key={item.subject}>{item.subject}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        검색
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default TodoFilter;