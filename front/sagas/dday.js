import { all, fork, takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_DDAY_REQUEST, ADD_DDAY_SUCCESS, ADD_DDAY_FAILURE, LOAD_DDAY_LIST_REQUEST, LOAD_DDAY_LIST_SUCCESS, LOAD_DDAY_LIST_FAILURE, } from '../reducers/dday';

function addDdayAPI(DdayData) {
    return axios.post('/dday', DdayData);
}

function* addDday(action) {
    try {
        const result = yield call(addDdayAPI, action.data);
        yield put({
            type: ADD_DDAY_SUCCESS,
            data: result.data,
        })
    } catch (e) {
        console.error(e);
        yield put({
            type: ADD_DDAY_FAILURE,
            error: e,
        })
    }
}

function* watchAddDday() {
    yield takeLatest(ADD_DDAY_REQUEST, addDday);
}

function loadDdayAPI() {
    return axios.get('/ddaylist');
}

function* loadDday() {
    try {
        const result = yield call(loadDdayAPI);
        yield put({
            type: LOAD_DDAY_LIST_SUCCESS,
            data: result.data,
        })
    } catch(e) {
        console.error(e);
        yield put({
            type: LOAD_DDAY_LIST_FAILURE,
            error: e,
        })
    }
}

function* watchLoadDday() {
    yield takeLatest(LOAD_DDAY_LIST_REQUEST, loadDday);
}

export default function* DdaySaga() {
    yield all([
        fork(watchAddDday),
        fork(watchLoadDday),
    ])
}