import React, { useState } from 'react';
import { Form, Select, Divider, Input, Checkbox, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

let index = 0;

const TodoForm = () => {
    const [ items, setItems ] = useState(['수학', '영어']);
    const [ name, setName ] = useState('');
    const [componentSize, setComponentSize] = useState('default');

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = () => {
        console.log('addItem');
        setItems([...items, name || `New item ${index++}`]);
        setName('');
    };

    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    }

    const onChangeCheckbox = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
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
                <Form.Item label="계획명" colon={false}>
                    <Form.Item
                    name="todocontents"
                    noStyle
                    rules={[{ required: true, message: '내용을 입력해주세요' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="계획명을 입력해주세요" />
                    </Form.Item>
                </Form.Item>
                <Form.Item label="과목" colon={false}>
                    <Form.Item
                        name={['address', 'province']}
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
                                <Input style={{ flex: 'auto' }} value={name} onChange={onNameChange} />
                                <a
                                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                    onClick={addItem}
                                >
                                    <PlusOutlined /> 과목 추가
                                </a>
                                </div>
                            </div>
                            )}
                        >
                            {items.map(item => (
                            <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="분량" colon={false} style={{ marginBottom: 0 }}>
                    <Form.Item
                    name="quantity"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <Input placeholder="분량을 입력해주세요" />
                    </Form.Item>
                    <Form.Item
                    name="unit"
                    rules={[{ required: true }]}
                    style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                    >
                        <Select defaultValue="개" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="개">개</Option>
                            <Option value="문제">문제</Option>
                            <Option value="쪽">쪽</Option>
                            <Option value="없음">없음</Option>
                        </Select>
                    </Form.Item>
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