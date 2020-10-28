import React from 'react';
import { Tabs } from 'antd';
import TodoForm from '../containers/TodoForm';
import DdayForm from '../containers/DdayForm';

const { TabPane } = Tabs;

const SelectForms = () => {
    const callback = (key) => {
        console.log(key);
    }
    return (
        <>
            <Tabs onChange={callback} type="card">
                <TabPane tab="계획 짜기" key="1">
                    <TodoForm />
                </TabPane>
                <TabPane tab="D-day" key="2">
                    <DdayForm />
                </TabPane>
            </Tabs>
        </>
    );
};

export default SelectForms;