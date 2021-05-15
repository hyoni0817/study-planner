import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, USER_ID_CHECK_REQUEST, USER_ID_CHECK_SUCCESS, USER_ID_CHECK_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../reducers/user';

function signUpAPI(userData) {
    return axios.post('/user/signup', userData);
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

function loginAPI(loginData) {
    return axios.post('/user/login', loginData, {
        withCredentials: true,
    });
}

function* login(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(loginAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE,
            error: e,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login);
}

function logoutAPI() {
    return axios.post('/user/logout', {}, {
        withCredentials: true,
    });
}

function* logout(action) {
    try {
        const result = yield call(logoutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE,
            error: e,
        })
    }
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout);
}

function loadUserAPI() {
    return axios.get('/user', {
        withCredentials: true,
    });
}

function* loadUser() {
    try {
        const result = yield call(loadUserAPI);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        })
    }
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchUserIdCheck),
        fork(watchLogin),
        fork(watchLogout),
        fork(watchLoadUser),
    ])
}