import React, { useState, useEffect } from 'react';
import { Input, DatePicker, Checkbox, Form, Button } from 'antd';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { SEARCH_DDAY_LIST_REQUEST } from '../reducers/dday';

const DdayFilter = () => {
    const dispatch = useDispatch();
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';
    const date = new Date();
    const todayDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const [ form ] = Form.useForm();

    const [ DdayTitle, setDdayTitle ] = useState('');
    const [ startDate, setStartDate ] = useState(moment(todayDate).format(dateFormat));
    const [ endDate, setEndDate ] = useState(moment(todayDate).format(dateFormat));
    const [ memo, setMemo ] = useState('');
    const [ checkDate, setCheckDate ] = useState(false);
    const [ allDateCheckState, setllDateCheckState ] = useState(false);
    const [ dateOrAllDateClickState, setDateOrAllDateClickState ] = useState(false);

    useEffect(() => {
        if(dateOrAllDateClickState) {
            form.validateFields(['date']);
        }
    }, [checkDate, dateOrAllDateClickState]);
    
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        }
    }

    const onChangeDdayTitle = (e) => {
        setDdayTitle(e.target.value);
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
    };

    const onChangeAllDateCheckBox = (e) => {
        setDateOrAllDateClickState(true);
        console.log(`checked = ${e.target.checked}`);
        setllDateCheckState(e.target.checked);
        e.target.checked ? setCheckDate(false) : ( startDate && endDate ? setCheckDate(false) : setCheckDate(true));
    };

    const onChangeMemo = (e) => {
        setMemo(e.target.value);
    };

    const onFinish = (values) => {
        dispatch({
            type: SEARCH_DDAY_LIST_REQUEST,
            data: {
                DdayTitle,
                startDate,
                endDate,
                allDateCheckState,
                memo,
            }
        })
    }
    
    return (
        <>
            <Form
                {...layout}
                name="searchForm"
                onFinish={onFinish}
                form={form}
            >
                <Form.Item
                    name="DdayTitle"
                    rules={[{ required: true, min:2, message: '검색어를 2글자 이상 입력해주세요'}]}
                >
                    <Input placeholder="제목을 입력해주세요" onChange={onChangeDdayTitle} />
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
                    name="DdayMemo"
                    rules={[{ required: true, min:2, message: '검색어를 2글자 이상 입력해주세요'}]}
                >
                    <Input placeholder="메모한 내용을 입력해주세요" onChange={onChangeMemo} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        검색
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
    
}

export default DdayFilter;