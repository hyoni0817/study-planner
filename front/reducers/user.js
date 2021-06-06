export const initialState = {
    me: null,
    isSignedUp: false,
    isSigningUp: false,
    isUserIdChecked: false,
    isUserIdChecking: false,
    existingUserId: false,
    isLoggingIn: false,
    isLoggedIn: false,
    isLoggingOut: false,
    isLoggedOut: false,
    logoutErrorReason: '',
    loginErrorReason: '',
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

//로그인 액션
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

//로그아웃 액션
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

//사용자 정보 불러오는 액션
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

//loginErrorReason state 초기화하는 액션
export const INITIAL_LOG_IN_ERROR_REASON = 'INITIAL_LOG_IN_ERROR_REASON';

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
        case LOG_IN_REQUEST: 
            return {
                ...state,
                isLoggingIn: true,
                loginErrorReason: '',
            };
        case LOG_IN_SUCCESS: 
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                isLoggedOut: false,
                me: action.data,
            };  
        case LOG_IN_FAILURE: 
            return {
                ...state,
                isLoggingIn: false,
                me: null,
                loginErrorReason: action.reason,
            };
        case LOG_OUT_REQUEST: 
            return {
                ...state,
                isLoggingOut: true,
                logoutErrorReason: '',
            };
        case LOG_OUT_SUCCESS: 
            return {
                ...state,
                isLoggingOut: false,
                isLoggedOut: true,
                isLoggedIn: false,
                me: null,
            };  
        case LOG_OUT_FAILURE: 
            return {
                ...state,
                isLoggingOut: false,
                me: null,
                logoutErrorReason: action.error,
            };
        case LOAD_USER_REQUEST: 
            return {
                ...state,
            };
        case LOAD_USER_SUCCESS: 
            return {
                ...state,
                me: action.data,
            };  
        case LOAD_USER_FAILURE: 
            return {
                ...state,
            };
        case INITIAL_LOG_IN_ERROR_REASON: 
            return {
                ...state,
                loginErrorReason: '',
            }
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;