export const initialState = {
    todoList : [],
    id: 0,
};

//TODO 추가하는 액션
export const ADD_TODO = 'ADD_TODO';

//TODO 편집하는 액션
export const EDIT_TODO = 'EDIT_TODO';

//TODO 삭제하는 액션
export const DELETE_TODO = 'DELETE_TODO';

//TODO 로드하는 액션
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todoList : [ action.data, ...state.todoList ],
            }; 
        default: {
            return {
                ...state,
            }
        }
        // case EDIT_TODO:
        //     return ;
        // case DELETE_TODO:
        //     return ;             
    }
}

export default reducer;