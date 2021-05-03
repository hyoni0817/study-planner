import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, USER_ID_CHECK_REQUEST, USER_ID_CHECK_SUCCESS, USER_ID_CHECK_FAILURE } from '../reducers/user';

function signUpAPI(userData) {
    return axios.post('/user', userData);
}

function* signUp(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: SIGN_UP_FAILURE,
            error: e,
        })
    }
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function userIdCheckAPI(userData) {
    return axios.post('/user/idcheck', userData);
}

function* userIdCheck(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(userIdCheckAPI, action.data);
        yield put({
            type: USER_ID_CHECK_SUCCESS,
            data: result.data.result,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: USER_ID_CHECK_FAILURE,
            error: e,
        })
    }
}

function* watchUserIdCheck() {
    yield takeLatest(USER_ID_CHECK_REQUEST, userIdCheck);
}

export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchUserIdCheck),
    ])
}