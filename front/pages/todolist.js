import React from 'react';
import { Tabs } from 'antd';
import TodoFilter from '../containers/TodoFilter';
import Todo from '../components/Todo';
import Dday from '../components/Dday';

const { TabPane } = Tabs;

const TodoList = () => {   
    return (
        <> 
            <div>
                <TodoFilter />
                <Tabs defaultActiveKey="1">
                    <TabPane tab="공부 계획" key="1">
                        <Todo />
                    </TabPane>
                    <TabPane tab="D-day" key="2">
                        <Dday />
                    </TabPane>
                </Tabs>
            </div>
        </>
    )
}

export default TodoList
