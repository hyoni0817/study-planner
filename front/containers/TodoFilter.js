import React from 'react';
import { Input, DatePicker, Checkbox, Select } from 'antd';

const TodoFilter = () => {
    const { Search } = Input;
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const children = [];

    const onSearch = value => console.log(value);

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    return (
        <>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
            <RangePicker />
            <Checkbox onChange={onChange}>완료한 할 일 포함</Checkbox>
            <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
                onChange={handleChange}
            >
                {children}
            </Select>
        </>
    );
};

export default TodoFilter;