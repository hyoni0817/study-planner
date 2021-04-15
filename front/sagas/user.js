import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILURE } from '../reducers/user';

function addUserAPI(userData) {
    return axios.post('/user', userData);
}

function* addUser(action) {
    console.log("action.data:", action.data);
    try {
        const result = yield call(addUserAPI, action.data);
        yield put({
            type: ADD_USER_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_USER_FAILURE,
            error: e,
        })
    }
}

function* watchAddUser() {
    yield takeLatest(ADD_USER_REQUEST, addUser);
}

export default function* userSaga() {
    yield all([
        fork(watchAddUser),
    ])
}