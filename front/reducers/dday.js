export const initialState = {
    DdayList : [],
    isLoadingDday: false,
    isAddingDday: false,
    addingDdayErrorReason: '',
    DdayAdded: false,
    isSearchingDday: false,
    addingDdayErrorReason: '',
    DdaySearched: false,
    isEditingDday: false,
    editDdayErrorReason: '',
    useSearch: 'no',
};

//Dday 추가하는 액션
export const ADD_DDAY_REQUEST = 'ADD_DDAY_REQUEST';
export const ADD_DDAY_SUCCESS = 'ADD_DDAY_SUCCESS';
export const ADD_DDAY_FAILURE = 'ADD_DDAY_FAILURE';

//Dday 편집하는 액션
export const EDIT_DDAY = 'EDIT_DDAY';

//Dday 삭제하는 액션
export const DELETE_DDAY = 'DELETE_DDAY';

//Dday 로드하는 액션
export const LOAD_DDAY_LIST_REQUEST = 'LOAD_DDAY_LIST_REQUEST';
export const LOAD_DDAY_LIST_SUCCESS = 'LOAD_DDAY_LIST_SUCCESS';
export const LOAD_DDAY_LIST_FAILURE = 'LOAD_DDAY_LIST_FAILURE';

//DDAY 검색하는 액션
export const SEARCH_DDAY_LIST_REQUEST = 'SEARCH_DDAY_LIST_REQUEST';
export const SEARCH_DDAY_LIST_SUCCESS = 'SEARCH_DDAY_LIST_SUCCESS';
export const SEARCH_DDAY_LIST_FAILURE = 'SEARCH_DDAY_LIST_FAILURE';

//Dday 수정하는 액션
export const EDIT_DDAY_REQUEST = 'EDIT_DDAY_REQUEST';
export const EDIT_DDAY_SUCCESS = 'EDIT_DDAY_SUCCESS';
export const EDIT_DDAY_FAILURE = 'EDIT_DDAY_FAILURE';

//Dday 삭제하는 액션
export const DELETE_DDAY_REQUEST = 'DELETE_DDAY_REQUEST'; 
export const DELETE_DDAY_SUCCESS = 'DELETE_DDAY_SUCCESS'; 
export const DELETE_DDAY_FAILURE = 'DELETE_DDAY_FAILURE'; 

//선택한 Dday를 홈 화면에 보이게 할지 말지 결정하는 액션
export const SHOW_DDAY_REQUEST = 'SHOW_DDAY_REQUEST'; 
export const SHOW_DDAY_SUCCESS = 'SHOW_DDAY_SUCCESS'; 
export const SHOW_DDAY_FAILURE = 'SHOW_DDAY_FAILURE'; 

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case ADD_DDAY_REQUEST:
            return {
                ...state,
                isAddingDday: true,
                addingDdayErrorReason: '',
                DdayAdded: false,
            };
        case ADD_DDAY_SUCCESS:
            return {
                ...state,
                isAddingDday: false,
                DdayList: [ action.data, ...state.DdayList ],
                DdayAdded: true,
            };
        case ADD_DDAY_FAILURE:
            return {
                ...state,
                isAddingDday: false,
                addingDdayErrorReason: action.error,
            };
        case LOAD_DDAY_LIST_REQUEST:
            return {
                ...state,
                isLoadingDday: true,
                DdayList: [],
            };
        case LOAD_DDAY_LIST_SUCCESS:
            return {
                ...state,
                isLoadingDday: false,
                DdayList: action.data,
            };
        case LOAD_DDAY_LIST_FAILURE: 
            return {
                ...state,
                isLoadingDday: false,
            };
        case SEARCH_DDAY_LIST_REQUEST:
            return {
                ...state,
                isSearchingDday: true,
                addingDdayErrorReason: '',
                DdaySearched: false,
                useSearch: 'request',
            };
        case SEARCH_DDAY_LIST_SUCCESS:
            return {
                ...state,
                isSearchingDday: false,
                DdayList : action.data,
                DdaySearched: true,
                useSearch: 'success',
            };
        case SEARCH_DDAY_LIST_FAILURE: 
            return {
                ...state,
                isAddingDday: false,
                addingDdayErrorReason: action.error,
                useSearch: 'fail',
            };
        case EDIT_DDAY_REQUEST: 
            return {
                ...state,
                isEditingDday: true, 
                editDdayErrorReason: '',
            }
        case EDIT_DDAY_SUCCESS: 
            const editDdayIndex = state.DdayList.findIndex(v => v.id === action.data.id);
            const editDday = state.DdayList[editDdayIndex]; 
            const editDdayList = [...state.DdayList];
            editDdayList[editDdayIndex] = {...editDday, ...action.data};
        
        return {
            ...state,
            isEditingDday: false,
            DdayList: [...editDdayList], 
        }
        case EDIT_DDAY_FAILURE: 
        return {
            ...state,
            isEditingDday: false,
            editDdayErrorReason: action.error,
        }
        case DELETE_DDAY_REQUEST: {
            return {
                ...state,
            }
        }
        case DELETE_DDAY_SUCCESS: {
            return {
                ...state,
                DdayList: state.DdayList.filter( v => v.id !== action.data),
            }
        }
        case DELETE_DDAY_FAILURE: {
            return {
                ...state,
            }
        }
        case SHOW_DDAY_REQUEST:
            return {
                ...state,
            }
        case SHOW_DDAY_SUCCESS: 
            const DdayIndex = state.DdayList.findIndex(v => v.id === action.data.id);
            const Dday = state.DdayList[DdayIndex];            
            const DdayList = [...state.DdayList];
            DdayList[DdayIndex] = {...Dday, viewState: action.data.viewState};

            return {
                ...state,
                DdayList : [ ...DdayList ],
            }
        case SHOW_DDAY_FAILURE:
            return {
                ...state,
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;