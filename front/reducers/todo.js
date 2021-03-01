export const initialState = {
    todoList : [],
    subjectList: [],
    todoPostId: 0,
    isAddingTodo: false,
    addingTodoErrorReason: '',
    todoAdded: false,
};

//TODO 추가하는 액션
export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

//TODO 편집하는 액션
export const EDIT_TODO = 'EDIT_TODO';

//TODO 삭제하는 액션
export const DELETE_TODO = 'DELETE_TODO';

//TODO 로드하는 액션
export const LOAD_TODO_LIST_REQUEST = 'LOAD_TODO_LIST_REQUEST';
export const LOAD_TODO_LIST_SUCCESS = 'LOAD_TODO_LIST_SUCCESS';
export const LOAD_TODO_LIST_FAILURE = 'LOAD_TODO_LIST_FAILURE';

//TODO 검색하는 액션
export const SEARCH_TODO_LIST_REQUEST = 'SEARCH_TODO_LIST_REQUEST';
export const SEARCH_TODO_LIST_SUCCESS = 'SEARCH_TODO_LIST_SUCCESS';
export const SEARCH_TODO_LIST_FAILURE = 'SEARCH_TODO_LIST_FAILURE';

//선택할 과목 로드하는 액션
export const LOAD_SUBJECT_LIST_REQUEST = 'LOAD_SUBJECT_LIST_REQUEST';
export const LOAD_SUBJECT_LIST_SUCCESS = 'LOAD_SUBJECT_LIST_SUCCESS';
export const LOAD_SUBJECT_LIST_FAILURE = 'LOAD_SUBJECT_LIST_FAILURE';

//과목 추가하는 액션
export const ADD_SUBJECT = 'ADD_SUBJECT';

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_TODO_REQUEST:
            return {
                ...state,
                isAddingTodo: true,
                addingTodoErrorReason: '',
                todoAdded: false,
            }; 
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                isAddingTodo: false,
                todoList : [ action.data, ...state.todoList ],
                todoAdded: true,
            }
        case ADD_TODO_FAILURE: 
            return {
                ...state,
                isAddingTodo: false,
                addingTodoErrorReason: action.error,
            };
        case LOAD_TODO_LIST_REQUEST:
            return {
                ...state,
                todoList: [],
            }
        case LOAD_TODO_LIST_SUCCESS:
            return {
                ...state,
                todoList: action.data,
            }
        case LOAD_TODO_LIST_FAILURE:
            return {
                ...state,
            }
        case SEARCH_TODO_LIST_REQUEST:
            return {
                ...state,
                isSearchingTodo: true,
                addingTodoErrorReason: '',
                todoSearched: false,
            };
        case SEARCH_TODO_LIST_SUCCESS:
            return {
                ...state,
                isSearchingTodo: false,
                todoList : action.data,
                todoSearched: true,
            };
        case SEARCH_TODO_LIST_FAILURE: 
            return {
                ...state,
                isAddingTodo: false,
                addingTodoErrorReason: action.error
            };
        case LOAD_SUBJECT_LIST_REQUEST:
            return {
                ...state,
                subjectList: [],
            }
        case LOAD_SUBJECT_LIST_SUCCESS:
            return {
                ...state,
                subjectList: action.data,
            }
        case LOAD_SUBJECT_LIST_FAILURE:
            return {
                ...state,
            }    
        case ADD_SUBJECT:
            return {
                ...state,
                subjectList: [...state.subjectList, action.data],
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