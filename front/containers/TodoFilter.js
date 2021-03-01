import React, { useState } from 'react';
import { Input, DatePicker, Checkbox, Select, Form, Button } from 'antd';
import moment from 'moment';

//redux
import { useDispatch } from 'react-redux';
import { SEARCH_TODO_LIST_REQUEST } from '../reducers/todo';

const TodoFilter = () => {
    const dispatch = useDispatch();
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const children = [];
    const dateFormat = 'YYYY-MM-DD';
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    
    const [ todoTitle, setTodoTitle ] = useState('');
    const [ startDate, setStartDate ] = useState(moment(todayDate).format(dateFormat));
    const [ endDate, setEndDate ] = useState(moment(todayDate).format(dateFormat));
    const [ subjects, setSubjects ] = useState([]);
    const [ allDateCheckState, setllDateCheckState ] = useState(false);

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        }
    }

    const onChangeTodoSearch = (e) => {
        setTodoTitle(e.target.value);
    };

    const onChangeDate = (value) => {
        if(value) {
            const startDateFormat = moment(value[0]["_d"]).format(dateFormat);
            const endDateFormat = moment(value[1]["_d"]).format(dateFormat); 
            setStartDate(startDateFormat);
            setEndDate(endDateFormat);
            startDateFormat && endDateFormat ? setCheckDate(false) : setCheckDate(true);    
        } else {
            setStartTime('');
            setEndTime('');
            setCheckTime(true);
        }    
    }

    function onChangeAllDateCheckBox(e) {
        console.log(`checked = ${e.target.checked}`);
        setllDateCheckState(e.target.checked);
    }

    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
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
            >
                <Form.Item
                    name="todoTitle"
                >
                    <Input placeholder="계획명을 입력해주세요" onChange={onChangeTodoSearch} />
                </Form.Item>
                <Form.Item
                    name="date"
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
                        {children}
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