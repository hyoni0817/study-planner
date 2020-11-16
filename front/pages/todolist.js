import React from 'react';
import TodoFilter from '../containers/TodoFilter';
import Todo from '../components/Todo';
const TodoList = () => {   
    return (
        <> 
            <div>
                <TodoFilter />
                <Todo />
            </div>
        </>
    )
}

export default TodoList
