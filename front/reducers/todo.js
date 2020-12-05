export const initialState = {
    todoList : [],
    DdayList : [],
    todoPostId: 0,
    DdayPostId: 0,
};

//TODO 추가하는 액션
export const ADD_TODO = 'ADD_TODO';

//TODO 편집하는 액션
export const EDIT_TODO = 'EDIT_TODO';

//TODO 삭제하는 액션
export const DELETE_TODO = 'DELETE_TODO';

//TODO 로드하는 액션
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';

//Dday 추가하는 액션
export const ADD_DDAY = 'ADD_DDAY';

//Dday 편집하는 액션
export const EDIT_DDAY = 'EDIT_DDAY';

//Dday 삭제하는 액션
export const DELETE_DDAY = 'DELETE_DDAY';

//Dday 로드하는 액션
export const LOAD_DDAY_LIST = 'LOAD_DDAY_LIST';

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todoList : [ action.data, ...state.todoList ],
            }; 
        case ADD_DDAY: {
            return {
                ...state,
                DdayList : [ action.data, ...state.DdayList ],
            }
        }
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