export const initialState = {
    isSignedUp: false,
    isSigningUp: false,
    signUpErrorReason: '',
};

//사용자 추가하는 액션
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

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
        default: {
            return {
                ...state,
            }
        }
    }
}

export default reducer;