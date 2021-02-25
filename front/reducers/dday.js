export const initialState = {
    DdayList : [],
    DdayPostId: 0,
    isAddingDday: false,
    addingDdayErrorReason: '',
    DdayAdded: false,
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
                DdayList: [],
            };
        case LOAD_DDAY_LIST_SUCCESS:
            return {
                ...state,
                DdayList: action.data,
            };
        case LOAD_DDAY_LIST_FAILURE: 
            return {
                ...state,
            };
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;