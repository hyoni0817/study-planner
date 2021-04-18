import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE } from '../reducers/user';

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

export default function* userSaga() {
    yield all([
        fork(watchSignUp),
    ])
}