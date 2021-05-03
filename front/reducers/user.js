export const initialState = {
    isSignedUp: false,
    isSigningUp: false,
    isUserIdChecked: false,
    isUserIdChecking: false,
    existingUserId: false,
    userIdCheckReason: '',
    signUpErrorReason: '',
};

//사용자 추가하는 액션
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//아이디 중복 체크하는 액션
export const USER_ID_CHECK_REQUEST = 'USER_ID_CHECK_REQUEST';
export const USER_ID_CHECK_SUCCESS = 'USER_ID_CHECK_SUCCESS';
export const USER_ID_CHECK_FAILURE = 'USER_ID_CHECK_FAILURE';

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                isSigningUp: true,
                isSignedUp: false,
                signUpErrorReason: '',
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isSigningUp: false,
                isSignedUp: true,
            };
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isSigningUp: false,
                signUpErrorReason: action.error,
            }
        case USER_ID_CHECK_REQUEST: 
            return {
                ...state,
                isUserIdChecking: true,
                isUserIdChecked: false,
            };
        case USER_ID_CHECK_SUCCESS: 
            return {
                ...state,
                isUserIdChecking: false,
                isUserIdChecked: true,
                existingUserId: action.data,
            };  
        case USER_ID_CHECK_FAILURE: 
            return {
                ...state,
                isUserIdChecking: false,
                userIdCheckReason: action.error,
            };
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;