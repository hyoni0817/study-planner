export const initialState = {
    todoList : [],
    todayTodoList: [],
    nowTodoList: [],
    subjectList: [],
    todoPostId: 0,
    hasMoreTodo: false,
    isLoadingTodo: false,
    isLoadingMoreTodo: false,
    isAddingTodo: false,
    addingTodoErrorReason: '',
    todoAdded: false,
    isEditingTodo: false,
    editTodoErrorReason: '',
    todoSearched: false,
    useSearch: 'no',
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

//오늘의 TODO 로드하는 액션
export const LOAD_TODAY_TODO_LIST_REQUEST = 'LOAD_TODAY_TODO_LIST_REQUEST';
export const LOAD_TODAY_TODO_LIST_SUCCESS = 'LOAD_TODAY_TODO_LIST_SUCCESS';
export const LOAD_TODAY_TODO_LIST_FAILURE = 'LOAD_TODAY_TODO_LIST_FAILURE';

//지금 해야하는 TODO 로드하는 액션
export const LOAD_NOW_TODO_LIST_REQUEST = 'LOAD_NOW_TODO_LIST_REQUEST';
export const LOAD_NOW_TODO_LIST_SUCCESS = 'LOAD_NOW_TODO_LIST_SUCCESS';
export const LOAD_NOW_TODO_LIST_FAILURE = 'LOAD_NOW_TODO_LIST_FAILURE';

//TODO 검색하는 액션
export const SEARCH_TODO_LIST_REQUEST = 'SEARCH_TODO_LIST_REQUEST';
export const SEARCH_TODO_LIST_SUCCESS = 'SEARCH_TODO_LIST_SUCCESS';
export const SEARCH_TODO_LIST_FAILURE = 'SEARCH_TODO_LIST_FAILURE';

//선택할 과목 로드하는 액션
export const LOAD_SUBJECT_LIST_REQUEST = 'LOAD_SUBJECT_LIST_REQUEST';
export const LOAD_SUBJECT_LIST_SUCCESS = 'LOAD_SUBJECT_LIST_SUCCESS';
export const LOAD_SUBJECT_LIST_FAILURE = 'LOAD_SUBJECT_LIST_FAILURE';

//TODO 완료 버튼 누르는 액션
export const COMPLETE_TODO_REQUEST = 'COMPLETE_TODO_REQUEST';
export const COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS';
export const COMPLETE_TODO_FAILURE = 'COMPLETE_TODO_FAILURE';

//TODO 수정하는 액션
export const EDIT_TODO_REQUEST = 'EDIT_TODO_REQUEST';
export const EDIT_TODO_SUCCESS = 'EDIT_TODO_SUCCESS';
export const EDIT_TODO_FAILURE = 'EDIT_TODO_FAILURE';

//TODO 삭제하는 액션
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'; 
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'; 
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE'; 
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
                todayTodoList: [action.data, ...state.todayTodoList],
                nowTodoList: [action.data, ...state.nowTodoList],
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
                isLoadingTodo: !action.lastId ? true : false, 
                isLoadingMoreTodo: action.lastId ? true : false, 
                todoList: !action.lastId ? [] : state.todoList,
                hasMoreTodo: action.lastId ? state.hasMoreTodo : true, 
            }
        case LOAD_TODO_LIST_SUCCESS:
            return {
                ...state,
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
                todoList: state.todoList.concat(action.data),
                hasMoreTodo: action.data.length === 10,
            }
        case LOAD_TODO_LIST_FAILURE:
            return {
                ...state,
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
            }
        case LOAD_TODAY_TODO_LIST_REQUEST:
            return {
                ...state,
                isLoadingTodo: !action.lastId ? true : false, 
                isLoadingMoreTodo: action.lastId ? true : false, 
                todayTodoList: !action.lastId ? [] : state.todayTodoList,
                hasMoreTodo: action.lastId ? state.hasMoreTodo : true, 
            }
        case LOAD_TODAY_TODO_LIST_SUCCESS:
            return {
                ...state,
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
                todayTodoList: state.todayTodoList.concat(action.data),
                hasMoreTodo: action.data.length === 10,
            }
        case LOAD_TODAY_TODO_LIST_FAILURE:
            return {
                ...state,
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
            }
        case LOAD_NOW_TODO_LIST_REQUEST:
            return {
                ...state,
                isLoadingTodo: true,
                nowTodoList: [],
            }
        case LOAD_NOW_TODO_LIST_SUCCESS:
            return {
                ...state,
                isLoadingTodo: false,
                nowTodoList: action.data,
            }
        case LOAD_NOW_TODO_LIST_FAILURE:
            return {
                ...state,
                isLoadingTodo: false,
            }
        case SEARCH_TODO_LIST_REQUEST:
            return {
                ...state,
                todoSearched: false,
                useSearch: 'request',
                isLoadingTodo: !action.lastId ? true : false, 
                isLoadingMoreTodo: action.lastId ? true : false, 
                todoList: !action.lastId ? [] : state.todoList,
                hasMoreTodo: action.lastId ? state.hasMoreTodo : true,      
            };
        case SEARCH_TODO_LIST_SUCCESS:
            return {
                ...state,
                todoSearched: true,
                useSearch: 'success',
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
                todoList: state.todoList.concat(action.data),
                hasMoreTodo: action.data.length === 10,
            };
        case SEARCH_TODO_LIST_FAILURE: 
            return {
                ...state,
                isAddingTodo: false,
                useSearch: 'fail',
                isLoadingTodo: false,
                isLoadingMoreTodo: false,
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
        case COMPLETE_TODO_REQUEST:
            return {
                ...state,
            }
        case COMPLETE_TODO_SUCCESS: 
            const todoIndex = state.todoList.findIndex(v => v.id === action.data.id);
            const todo = state.todoList[todoIndex];            
            const todoList = [...state.todoList];
            todoList[todoIndex] = {...todo, completion: action.data.completion};

            const todayTodoIndex = state.todayTodoList.findIndex(v => v.id === action.data.id);
            const todayTodo = state.todayTodoList[todayTodoIndex];            
            const todayTodoList = [...state.todayTodoList];
            todayTodoList[todayTodoIndex] = {...todayTodo, completion: action.data.completion};

            const nowTodoIndex = state.nowTodoList.findIndex(v => v.id === action.data.id);
            const nowTodo = state.nowTodoList[nowTodoIndex];
            const nowTodoList = [...state.nowTodoList];
            nowTodoList[nowTodoIndex] = {...nowTodo, completion: action.data.completion};

            return {
                ...state,
                todayTodoList: [...todayTodoList],
                todoList : [ ...todoList ],
                nowTodoList: [...nowTodoList],
            }
        case COMPLETE_TODO_FAILURE:
            return {
                ...state,
            }
        case EDIT_TODO_REQUEST: 
            return {
                ...state,
                isEditingTodo: true, 
                editTodoErrorReason: '',
            }
        case EDIT_TODO_SUCCESS: 
            const editTodoIndex = state.todoList.findIndex(v => v.id === action.data.id);
            const editTodo = state.todoList[editTodoIndex]; 
            const editTodoList = [...state.todoList];
            editTodoList[editTodoIndex] = {...editTodo, ...action.data};

            const editTodayTodoIndex = state.todayTodoList.findIndex(v => v.id === action.data.id);
            const editTodayTodo = state.todayTodoList[editTodayTodoIndex];            
            const editTodayTodoList = [...state.todayTodoList];
            editTodayTodoList[editTodayTodoIndex] = {...editTodayTodo, completion: action.data.completion};
        
            const editNowTodoIndex = state.nowTodoList.findIndex(v => v.id === action.data.id);
            const editNowTodo = state.nowTodoList[editNowTodoIndex];
            const editNowTodoList = [...state.nowTodoList];
            editNowTodoList[editNowTodoIndex] = {...editNowTodo, completion: action.data.completion};

        return {
            ...state,
            isEditingTodo: false,
            todayTodoList: [...editTodayTodoList],
            todoList: [...editTodoList], 
            nowTodoList: [...editNowTodoList]
        }
        case EDIT_TODO_FAILURE: 
        return {
            ...state,
            isEditingTodo: false,
            editTodoErrorReason: action.error,
        }
        case DELETE_TODO_REQUEST: {
            return {
                ...state,
            }
        }
        case DELETE_TODO_SUCCESS: {
            return {
                ...state,
                todoList: state.todoList.filter( v => v.id !== action.data),
                todayTodoList: state.todayTodoList.filter( v => v.id !== action.data),
                nowTodoList: state.nowTodoList.filter( v => v.id !== action.data),
            }
        }
        case DELETE_TODO_FAILURE: {
            return {
                ...state,
            }
        }
        case ADD_SUBJECT:
            return {
                ...state,
                subjectList: [...new Set([action.data, ...state.subjectList].map(JSON.stringify))].map(JSON.parse)
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