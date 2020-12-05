import React, { useState } from 'react';
import { Form, Select, Divider, Input, Checkbox, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TODO } from '../reducers/todo';

const { Option } = Select;

let index = 0;

const TodoForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { todoPostId } = useSelector(state => state.todo);

    const [ todoId, setTodoId ] = useState(todoPostId);
    const [ title, setTitle ] = useState('');
    const [ subjects, setSubjects ] = useState([]);
    const [ subjectName, setSubjectName ] = useState('');
    const [ quantity, setQuantity ] = useState('');
    const [ unit, setUnit ] = useState('개');
    const [ important, setImporant ] = useState('false');

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

    const onChangeCheckbox = (e) => {
        setImporant(e.target.checked);
    }

    const onFinish = values => {
        setTodoId( todoId => todoId + 1);
        dispatch({
            type: ADD_TODO,
            data: {
                todoPostId: todoId,
                title,
                subjects,
                quantity,
                unit,
                important,
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
                    name="todocontents"
                    noStyle
                    rules={[{ required: true, message: '내용을 입력해주세요' }]}
                    >
                        <Input style={{ width: 160 }} placeholder="계획명을 입력해주세요" value={title} onChange={onChangeTitle} />
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
                        >
                            {subjects.map(item => (
                            <Option key={item}>{item}</Option>
                            ))}
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